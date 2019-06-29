import * as Discord from "discord.js";
import {BossDialogGenerator} from "./bossDialogGenerator";
import {EncounterGenerator} from "./encounterGenerator";
import {EmojiiGroupConfig} from "./emojiiGroupConfig";
import {MiniBoss} from "./miniBoss";
import {OutputHandler} from "./outputHandler";
import {EmojiiCombo} from "./emojiiCombo";
import {RandomUtils} from "./randomUtils";
import {sleep} from "./sleepUtilities";

export class Boss{
  private static readonly DEFAULT_MAX_MESSAGES_BEFORE_BOSS_UPDATE : number = 10;
  private static readonly MSG_INTERVAL : number = 1000;
  private static readonly ONE_SECOND : number = 1000;
  private static readonly TIME_WARNING_INTERVAL: number = 10;
  private static readonly DEFAULT_ENCOUNTER_LENGTH = 60;
  private static readonly MAX_SLIDING_WINDOW_LENGTH = 8;

  private outputHandler : OutputHandler;
  private dialogGenerator : BossDialogGenerator;
  private bossChannelId : Discord.Snowflake;

  private miniboss : MiniBoss;
  private emojiiComboList : EmojiiCombo[];
  private emojiiSlidingWindow : string[];

  private numMessagesWithoutBossStatus : number;
  private isBossEncounterOver : boolean;
  private isBossEncounterInitialized: boolean;
  private outputMsgBuffer: string[];
  private numSecondsInEncounter : number;

  /**
  * Constructs a boss for the emojii battle
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
  the channel the battle will take place in.
  */
  constructor(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel)
  {
    // Handle I/O
    this.outputHandler = new OutputHandler(channel);
    this.dialogGenerator = new BossDialogGenerator();
    this.bossChannelId = channel.id;

    // Initialize encounter settings (combat)
    this.miniboss = EncounterGenerator.generateBoss();
    this.emojiiComboList  = EncounterGenerator.generateEmojiiCombos();
    this.emojiiSlidingWindow = [];

    // Initialize encounter settings (I/O)
    this.isBossEncounterOver = false;
    this.isBossEncounterInitialized = false;
    this.numMessagesWithoutBossStatus = 0;
    this.outputMsgBuffer = [];
    this.numSecondsInEncounter = 0;
  }

  /**
  * Returns wehther the encounter is over. True if encounter has ended, otherwise false.
  * @return {boolean} whether the encounter has ended.
  */
  public getEncounterHasEnded() : boolean
  {
    return this.isBossEncounterOver;
  }

  /**
  * Returns the ID of the channel where the boss fight is taking place
  * @return {Discord.Snowflake} the channel ID
  */
  public getBossChannelId() : Discord.Snowflake
  {
    return this.bossChannelId;
  }

  /**
  * Handles an emojii input during a boss fight
  * @param {string} textInput the string to process. (Should be an emojii)
  * @param {string} username the name of the user who sent the emojii.
  */
  public handleEmojiiInput(emojiiInput : string, username: string) : void
  {
    if(!this.isBossEncounterOver && this.isBossEncounterInitialized)
    {
      // Default damage/source
      let damage : number = 1;
      let source = `${username}'s ${emojiiInput}`;
      let damageMsg = this.dialogGenerator.getBossTakesMinorDamage(damage, source);

      // Determine if the emojii is present in any combo (sliding window)
      this.emojiiSlidingWindow.push(EmojiiGroupConfig.translateEmojii(emojiiInput));
      if(this.emojiiSlidingWindow.length > Boss.MAX_SLIDING_WINDOW_LENGTH)
      {
        this.emojiiSlidingWindow.pop();
      }

      let slidingWindowStr = this.emojiiSlidingWindow.toString();
      for(let idx=0; idx<this.emojiiComboList.length; idx++)
      {
        let emojiiCombo = this.emojiiComboList[idx];
        let comboRegExp = RegExp(emojiiCombo.getEmojiiCombo().toString());
        if(slidingWindowStr.match(comboRegExp))
        {
          // if a combo occurs
          let dmgRange = emojiiCombo.getDamageRange();
          damage = Math.floor(RandomUtils.getRandomValueFromMinToMax(dmgRange[0], dmgRange[1]));
          damageMsg = this.dialogGenerator.getBossTakesComboDamage(damage, emojiiCombo);

          // Clear sliding window
          this.emojiiSlidingWindow = [];

          // Queue a boss image update
          this.numMessagesWithoutBossStatus = Boss.DEFAULT_MAX_MESSAGES_BEFORE_BOSS_UPDATE;
          break;
        }
      }

      // Display combo status and damage
      this.outputMsgBuffer.push(damageMsg);
      this.miniboss.takeDamage(damage);

      // TODO add boss taunts at certain thresholds

      // If needed, refresh boss UI
      this.numMessagesWithoutBossStatus++;
      console.log("num messages " + this.numMessagesWithoutBossStatus);

      // Handle boss defeat, if needed
      if(this.miniboss.getCurrentHealth() <= 0)
      {
        this.handleBossDefeat();
      }
    }
  }

  /**
  * Begins the boss fight
  * @param {boolean} fastSpawn removes the waits in the spawn dialog.
  */
  public async spawn(fastSpawn: boolean = false) : Promise<void>
  {
    // Output boss intro
    let bossIntroStrPrefix = "You have summoned:\n"+BossDialogGenerator.MINOR_SPACER+"\n"+this.miniboss.getName();
    let bossIntroStrSuffix = this.dialogGenerator.getBossHealthStatus(this.miniboss.getCurrentHealth(), this.miniboss.getMaxHealth())
      + "\n" + BossDialogGenerator.MINOR_SPACER;
    this.outputHandler.outputToChannel(bossIntroStrPrefix);
    this.outputHandler.outputToChannel(this.miniboss.getEmojii());
    this.outputHandler.outputToChannel(bossIntroStrSuffix);

    // Give user time to process
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*3)};

    // Output abilities
    this.outputHandler.outputToChannel("You have the following abilities at your disposal:\n"+BossDialogGenerator.MINOR_SPACER+"\n");

    for(let idx=0; idx < this.emojiiComboList.length; idx++)
    {
        // Give user time to process
        if(!fastSpawn){await sleep(Boss.ONE_SECOND*3)};
        this.outputHandler.outputToChannel(this.emojiiComboList[idx].getFullEmojiiStr() + "\n\n");
    }
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*3)};
    this.outputHandler.outputToChannel(BossDialogGenerator.MINOR_SPACER);

    // Read the rules
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*3)};
    this.outputHandler.outputToChannel("Send emojii at the boss, one at a time, to deal damage.\n");
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*5)};
    this.outputHandler.outputToChannel("Complete an ability combo for bonus damage.\n"+BossDialogGenerator.MINOR_SPACER);
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*5)};

    // Start countdown timer
    let secondsToWait = 10;
    this.outputHandler.outputToChannel(":hourglass: The encounter begins in " + secondsToWait + " seconds");
    if(!fastSpawn){await sleep(Boss.ONE_SECOND*1)};
    for(let idx=0; idx<secondsToWait;idx++)
    {
      if(secondsToWait-idx <= 3)
      {
        this.outputHandler.outputToChannel(this.dialogGenerator.getSecondCountdown(secondsToWait-idx));
      }
      await sleep(Boss.ONE_SECOND);
    }

    // Start encounter
    this.outputHandler.outputToChannel(this.dialogGenerator.getSecondCountdown(0));
    this.isBossEncounterInitialized = true;
    this.outputMsgBufferLoop();
  }

  /**
  * Aborts the boss fight early
  */
  public abort() : void
  {
    // Empty message buffer
    this.onOutputMsgBuffer();

    this.outputHandler.outputToChannel(`Boss was aborted early. (${this.miniboss.getCurrentHealth()}/${this.miniboss.getMaxHealth}HP)`);
    this.endBossEncounter();
  }

  /**
  * Output a message when the boss is victorious.
  */
  public bossTimeout() : void
  {
    if(!this.isBossEncounterOver)
    {
      // Empty message buffer
      this.onOutputMsgBuffer();

      // Get boss message
      this.outputHandler.outputToChannel(this.dialogGenerator.getBossVictoryTaunt(this.miniboss.getEmojii()));
      this.endBossEncounter();
    }
  }

  /**
  * Output a message when the player is victorious.
  */
  private handleBossDefeat() : void
  {
    // Empty message buffer
    this.onOutputMsgBuffer();

    // Get framed boss defeat message
    let bossDefeatMsg = this.dialogGenerator.getBossDefeat(this.miniboss.getEmojii());

    // Get victory summary
    bossDefeatMsg += "\n\n:star:**"+this.miniboss.getName()+" was defeated!**:star:"
    this.outputHandler.outputToChannel(bossDefeatMsg);
    this.endBossEncounter();
  }

  /**
  * Outputs the verbose encounter status.
  */
  private outputBossFullStatus() : void
  {
    //----------------------------
    // Gargal the Destroyer
    let outputStr = BossDialogGenerator.SPACER +"\n" + this.miniboss.getName() +"\n"+this.miniboss.getEmojii() + " ";


    // Output Health bar and a verbos description of emojii combos
    //- :heart: :heart: :heart: :heart: :heart: :broken_heart:  :black_heart: :black_heart:
    //------------------
    //Starborn Fury
    //- :star: :heart: :full_moon: (22-50 dmg)
    //Rainbow Shape
    //- :red_circle: :droplet: :purple_heart: :yellow_heart: :purple_heart: :red_circle: :star: (82-116 dmg)
    //Fruit Ninja
    //- :melon: :tangerine: :melon: :tangerine: :melon: :tangerine: :melon: (45-65 dmg)
    outputStr+=
      this.dialogGenerator.getBossHealthStatus(this.miniboss.getCurrentHealth(), this.miniboss.getMaxHealth()) +
      "\n" +  BossDialogGenerator.MINOR_SPACER + "\n" +
      this.dialogGenerator.getComboStatus(this.emojiiComboList) +"\n" + BossDialogGenerator.SPACER;

    this.outputHandler.outputToChannel(outputStr);
  }

  /**
  * Cleans up the boss encounter.
  */
  private endBossEncounter() : void
  {
    this.isBossEncounterOver = true;

    // TODO display health percentage and time
    //this.outputHandler.outputToChannel();

  }

  /**
  * Output message buffer on an interval. Buffering is used to prevent message throttling
  */
  private async outputMsgBufferLoop() : Promise<void>
  {
    while(!this.isBossEncounterOver)
    {
      this.onOutputMsgBuffer();

      // Output boss status summary, if needed
      if(this.numMessagesWithoutBossStatus >= Boss.DEFAULT_MAX_MESSAGES_BEFORE_BOSS_UPDATE)
      {
        this.numMessagesWithoutBossStatus = 0;
        this.outputBossFullStatus();
      }

      if(this.numSecondsInEncounter % Boss.TIME_WARNING_INTERVAL == 0)
      {
        this.outputHandler.outputToChannel(`:hourglass: ${Boss.DEFAULT_ENCOUNTER_LENGTH - this.numSecondsInEncounter} seconds remain!`);
      }
      // End encounter if needed
      if(this.numSecondsInEncounter >= Boss.DEFAULT_ENCOUNTER_LENGTH)
      {
        this.bossTimeout();
      }

      await sleep(Boss.MSG_INTERVAL);
      this.numSecondsInEncounter++
    }
  }

  /**
  * Output message buffer on an interval.
  */
  private onOutputMsgBuffer()
  {
    // Output combo information
    let comboOutputMsg = "";
    let outputMsgBufferSize = this.outputMsgBuffer.length;
    for(let idx = 0; idx<outputMsgBufferSize; idx++)
    {
      comboOutputMsg+=this.outputMsgBuffer.pop() + "\n";
    }
    comboOutputMsg = comboOutputMsg.slice(0, -1);
    if(comboOutputMsg)
    {
      this.outputHandler.outputToChannel(comboOutputMsg);
    }

  }
}
