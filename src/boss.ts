import {BossDialogGenerator} as BossDialogGenerator from "bossDialogGenerator.ts";
import {OutputHandler} as OutputHandler from "outputHandler.ts";
import {EmojiiCombo} as EmojiiCombo from "emojiiCombo.ts";

export class Boss{
  private emojiiComboList : [EmojiiCombo];
  private outputHandler : OutputHandler;
  private dialogGenerator : BossDialogGenerator;
  private emojiiSlidingWindow : [string];

  constructor(outputHandler : OutputHandler, bossDialogGenerator : BossDialogGenerator)
  {
    this.outputHandler = outputHandler;
    this.dialogGenerator = bossDialogGenerator;
    this.emojiiComboList = [];
    this.emojiiSlidingWindow = [];
  }

  /**
  * Handles an emojii input during a boss fight
  * @param {string} textInput the string to process. (Should be an emojii)
  */
  public handleEmojiiInput(emojiiInput : string) : void
  {
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
    this.outputHandler.outputToChannel("Boss was aborted early.");
  }
}
