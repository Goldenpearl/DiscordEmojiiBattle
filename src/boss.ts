import * as Discord from "discord.js";
import {BossDialogGenerator} from "./bossDialogGenerator";
import {OutputHandler} from "./outputHandler";
import {EmojiiCombo} from "./emojiiCombo";

export class Boss{
  private static readonly DEFAULT_HEALTH : number = 10;
  private static readonly DEFAULT_BOSS_NAME : string = "Gargal the Destroyer";
  private static readonly DEFAULT_BOSS_EMOJII : string = ":dolphin:";
  private static readonly DEFULT_EMOJII_COMBO_1 : EmojiiCombo = new EmojiiCombo("Starborn Fury", [":heart:", ":star:", ":moon:"]);

  private outputHandler : OutputHandler;
  private dialogGenerator : BossDialogGenerator;
  private bossChannelId : Discord.Snowflake;

  private bossName : string;
  private bossEmojii : string;
  private bossMaxHealth : number;
  private bossCurrentHealth : number;
  private emojiiComboList : EmojiiCombo[];
  private emojiiSlidingWindow : string[];
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

    // Initialize encounter settings
    this.bossName = Boss.DEFAULT_BOSS_NAME;
    this.bossEmojii = Boss.DEFAULT_BOSS_EMOJII;
    this.emojiiComboList  = [Boss.DEFULT_EMOJII_COMBO_1];
    this.emojiiSlidingWindow = [];
    this.bossMaxHealth = Boss.DEFAULT_HEALTH;
    this.bossCurrentHealth = Boss.DEFAULT_HEALTH;
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
  */
  public handleEmojiiInput(emojiiInput : string) : void
  {
    if(this.isBossAlive())
    {
      let damage : number = 1;
      this.outputHandler.outputToChannel(this.dialogGenerator.getBossTakesMinorDamage(damage, emojiiInput));
      this.bossCurrentHealth = this.bossCurrentHealth - damage;

      // TODO add boss taunts at certain thresholds

      // Determine if the emojii is present in any combo (sliding window)

      // Determine damage

      // Display combo status and damage

      // If needed, refresh boss UI

      if(!this.isBossAlive())
      {
        this.handleBossDefeat();
      }
    }
  }

  public spawn() : void
  {
    this.outputHandler.outputToChannel("This is a test to spawn the boss");
    this.outputHandler.outputToChannel(this.dialogGenerator.getFullStatus(this.bossName,
      this.bossEmojii, this.bossCurrentHealth, this.bossMaxHealth, this.emojiiComboList));
  }

  public abort() : void
  {
    // TODO display health percentage and time
    // TODO destroy boss
    this.outputHandler.outputToChannel(`Boss was aborted early. (${this.bossCurrentHealth}/${this.bossMaxHealth}HP)`);
  }

  /**
  * Output a message when the boss is victorious.
  */
  public bossTimeout() : void
  {
    if(this.isBossAlive())
    {
      this.outputHandler.outputToChannel(this.dialogGenerator.getBossVictoryTaunt());
    }
  }

  /**
  * Output a message when the player is victorious.
  */
  private handleBossDefeat() : void
  {
    this.outputHandler.outputToChannel(this.dialogGenerator.getBossDefeat());
  }

  /**
  * Returns whether the boss is currently alive.
  *
  * @return {boolean} true if the boss is alive, otherwise false
  */
  public isBossAlive() : boolean
  {
    return this.bossCurrentHealth > 0;
  }
}
