import * as Discord from "discord.js";
import {BossDialogGenerator} from "./bossDialogGenerator";
import {OutputHandler} from "./outputHandler";
import {EmojiiCombo} from "./emojiiCombo";
import {sleep} from "./sleepUtilities";

export class Boss{
  private static readonly DEFAULT_HEALTH : number = 2;
  private static readonly DEFAULT_BOSS_NAME : string = "Gargal the Destroyer";
  private static readonly DEFAULT_BOSS_EMOJII : string = ":dolphin:";
  private static readonly DEFAULT_EMOJII_COMBO_1 : EmojiiCombo = new EmojiiCombo("Starborn Fury", [":heart:", ":star:", ":moon:"]);
  private static readonly DEFAULT_MAX_MESSAGES_BEFORE_BOSS_UPDATE : number = 10;
  private static readonly MSG_INTERVAL : number = 1000;
  private static readonly TIME_WARNING_INTERVAL: number = 10;
  private static readonly DEFAULT_ENCOUNTER_LENGTH = 30;

  private outputHandler : OutputHandler;
  private dialogGenerator : BossDialogGenerator;
  private bossChannelId : Discord.Snowflake;

  private bossName : string;
  private bossEmojii : string;
  private bossMaxHealth : number;
  private bossCurrentHealth : number;
  private emojiiComboList : EmojiiCombo[];
  private emojiiSlidingWindow : string[];

  private numMessagesWithoutBossStatus : number;
  private isBossEncounterOver : boolean;
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
    this.bossName = Boss.DEFAULT_BOSS_NAME;
    this.bossEmojii = Boss.DEFAULT_BOSS_EMOJII;
    this.emojiiComboList  = [Boss.DEFAULT_EMOJII_COMBO_1];
    this.emojiiSlidingWindow = [];
    this.bossMaxHealth = Boss.DEFAULT_HEALTH;
    this.bossCurrentHealth = Boss.DEFAULT_HEALTH;

    // Initialize encounter settings (I/O)
    this.isBossEncounterOver = false;
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
    if(!this.isBossEncounterOver)
    {
      // Determine if the emojii is present in any combo (sliding window)

      // Determine damage
      let damage : number = 1;
      let source = `${username}'s ${emojiiInput}`;

      // Display combo status and damage
      this.outputMsgBuffer.push(this.dialogGenerator.getBossTakesMinorDamage(damage, source));
      this.bossCurrentHealth = this.bossCurrentHealth - damage;

      // TODO add boss taunts at certain thresholds

      // If needed, refresh boss UI
      this.numMessagesWithoutBossStatus++;
      console.log("num messages " + this.numMessagesWithoutBossStatus);

      // Handle boss defeat, if needed
      if(this.bossCurrentHealth <= 0)
      {
        this.handleBossDefeat();
      }
    }
  }

  /**
  * Begins the boss fight
  */
  public spawn() : void
  {
    this.outputBossFullStatus();
    this.outputMsgBufferLoop();
  }

  /**
  * Aborts the boss fight early
  */
  public abort() : void
  {
    // TODO display health percentage and time
    this.outputHandler.outputToChannel(`Boss was aborted early. (${this.bossCurrentHealth}/${this.bossMaxHealth}HP)`);
    this.endBossEncounter();
  }

  /**
  * Output a message when the boss is victorious.
  */
  public bossTimeout() : void
  {
    if(!this.isBossEncounterOver)
    {
      this.outputHandler.outputToChannel(this.dialogGenerator.getBossVictoryTaunt());
      this.endBossEncounter();
    }
  }

  /**
  * Output a message when the player is victorious.
  */
  private handleBossDefeat() : void
  {
    // Get framed boss defeat message
    let bossDefeatMsg = this.dialogGenerator.getFramedBossMessage(this.bossEmojii, this.dialogGenerator.getBossDefeat());

    // Get victory summary
    bossDefeatMsg += "\n\n:star:**"+this.bossName+" was defeated!**:star:"
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
    this.outputHandler.outputToChannel(BossDialogGenerator.SPACER +"\n" + this.bossName);

    // Output emojii by itself to make it large
    // :dolphin:
    this.outputHandler.outputToChannel(this.bossEmojii);

    // Output Health bar and a verbos description of emojii combos
    //- :heart: :heart: :heart: :heart: :heart: :broken_heart:  :black_heart: :black_heart:
    //------------------
    //Starborn Fury
    //- :star: :heart: :full_moon: (22-50 dmg)
    //Rainbow Shape
    //- :red_circle: :droplet: :purple_heart: :yellow_heart: :purple_heart: :red_circle: :star: (82-116 dmg)
    //Fruit Ninja
    //- :melon: :tangerine: :melon: :tangerine: :melon: :tangerine: :melon: (45-65 dmg)
    this.outputHandler.outputToChannel(
      this.dialogGenerator.getBossHealthStatus(this.bossCurrentHealth, this.bossMaxHealth) +
      "\n" +  BossDialogGenerator.MINOR_SPACER + "\n" +
      this.dialogGenerator.getComboStatus(this.emojiiComboList) +"\n" + BossDialogGenerator.SPACER
    );
  }

  /**
  * Cleans up the boss encounter.
  */
  private endBossEncounter() : void
  {
    this.isBossEncounterOver = true;
  }

  /**
  * Output message buffer on an interval. Buffering is used to prevent message throttling
  */
  private async outputMsgBufferLoop() : Promise<void>
  {
    while(!this.isBossEncounterOver)
    {
      console.log("tick " + this.numSecondsInEncounter);

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
}
