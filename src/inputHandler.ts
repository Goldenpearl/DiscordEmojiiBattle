import * as OutputHandlerFile from "./outputHandler";

class InputHandler
{
  private static readonly COMMAND_PREFIX : string = ".emojiiBatle";
  private static readonly START_BATTLE_COMMAND : string= "start";
  private static readonly ABORT_BATTLE_COMMAND : string = "abort";
  private static readonly HELP_COMMAND : string = "help";

  private emojiiBatleActive: boolean;
  private outputHandler : OutputHandler;
  // TODO battle channel

  // TODO pass in channels to listen on?
  constructor (outputHandler : OutputHandler)
  {
    this.emojiiBatleActive = false;
    this.outputHandler = outputHandler;
  };

  public handleInput(textInput:string, username:string) : void
  {
    if(textInput.startsWith(InputHandler.COMMAND_PREFIX))
    {
      // Handle core commands
      // .emojiiBattle start
      // .emojiiBattle abort
      // .emojiiBattle help
    }
    else if(this.emojiiBatleActive && InputHandler.isEmojii(textInput))
    {
      // Handle boss fight commands
      this.handleEmojiiInput(textInput);
    }
  }

  private handleEmojiiInput(textInput : string)
  {

  }

  private static isEmojii(textInput: string) : boolean
  {
    // Discord emojii rules:
    // at least two characters long
    // can only contain alphanumeric characters and underscores
    let isEmojii = false;

    let isLongEnoughToBeEmojii = textInput.length >= 4;
    if(isLongEnoughToBeEmojii)
    {
      let emojiiRegex = new RegExp(":\w\w+:");
      isEmojii = emojiiRegex.test(textInput);
    }
    return isEmojii;
  }

  private startEmojiiBatle() : void
  {

  }

  private abortEmojiiBattle() : void
  {

  }

  private displayHelp() : void
  {
    if(this.emojiiBatleActive)
    {
      "Cannot display full help options during battle.\n\nType '.emojiiBattle abort' to abort battle.";
    }
    else
    {

    }
  }
}
