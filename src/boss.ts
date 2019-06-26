import * as Discord from "discord.js";
import {BossDialogGenerator} from "./bossDialogGenerator";
import {OutputHandler} from "./outputHandler";
import {EmojiiCombo} from "./emojiiCombo";

export class Boss{
  private static readonly DEFAULT_HEALTH : number = 100;
  private outputHandler : OutputHandler;
  private dialogGenerator : BossDialogGenerator;
  private bossChannelId : Discord.Snowflake;

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
    this.emojiiComboList  = [];
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
    let damage : number = 1;
    this.outputHandler.outputToChannel(this.dialogGenerator.getBossTakesMinorDamage(damage, emojiiInput));
    this.bossCurrentHealth = this.bossCurrentHealth - damage;

    // Determine if the emojii is present in any combo (sliding window)

    // Determine damage

    // Display combo status and damage

    // If needed, refresh boss UI
  }

  public spawn() : void
  {
    this.outputHandler.outputToChannel("This is a test to spawn the boss");
  }

  public abort() : void
  {
    // TODO display health percentage and time
    // TODO destroy boss
    this.outputHandler.outputToChannel(`Boss was aborted early. (${this.bossCurrentHealth}/${this.bossMaxHealth}HP)`);
  }
}
