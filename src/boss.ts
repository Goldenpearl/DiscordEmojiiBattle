export class Boss{
  private emojiiCombo = "";
  private emojiiCombo2 = "";
  private emojiiCombo3 = "";

  private outputHandler : OutputHandler;
  constructor(outputHandler : OutputHandler)
  {
    this.outputHandler = outputHandler;
  }
  
  /**
  * Handles an emojii input during a boss fight
  * @param {string} textInput the string to process. (Should be an emojii)
  */
  public handleEmojiiInput(emojiiInput : string) : void
  {
    // Determine if the emojii is present in the combo

    // Determine damage

    // Display combo status and damage

    // If needed, refresh boss UI
  }

  public spawn() : void
  {

  }

  public abort() : void
  {
    // TODO display health percentage and time
    // TODO destroy boss
    this.outputHandler.outputToChannel("Boss was aborted early.");
  }
}
