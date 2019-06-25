import * as OutputHandlerFile from "./outputHandler";

class InputHandler
{
  private static readonly COMMAND_PREFIX : string = ".emojiiBatle";
  private static readonly START_BATTLE_COMMAND : string= "start";
  private static readonly ABORT_BATTLE_COMMAND : string = "abort";
  private static readonly HELP_COMMAND : string = "help";

  private emojiiBatleActive: boolean;
  private outputHandler : OutputHandler;
  private boss : Boss;
  // TODO battle channel

  // TODO pass in channels to listen on?
  constructor (outputHandler : OutputHandler)
  {
    this.emojiiBatleActive = false;
    this.outputHandler = outputHandler;
  };

  /**
  * Handles all potential command input strings
  * @param {string} textInput the string to process.
  * @param {string} username the name of the user who entered the command.
  */
  public handleInput(textInput:string, username:string) : void
  {
    if(textInput.startsWith(InputHandler.COMMAND_PREFIX + " "))
    {
      // Handle core commands
      let commandStr = textInput.slice(InputHandler.COMMAND_PREFIX.length + 1); // Remove the command prefix, and the space.
      if(commandStr == InputHandler.START_BATTLE_COMMAND)
      {
        this.startEmojiiBatle();
      }
      else if (commandStr == InputHandler.ABORT_BATTLE_COMMAND)
      {
        this.abortEmojiiBattle();
      }
      else if (commandStr == InputHandler.HELP_COMMAND)
      {
        this.displayHelp();
      }
      else
      {
        this.displayInvalidCommand();
      }
    }
    else if(this.emojiiBatleActive && InputHandler.isEmojii(textInput))
    {
      // Handle boss fight commands
      this.boss.handleEmojiiInput(textInput);
    }
  }

  /**
  * Returns true if the given string is an emojii. Otherwise, returns false.
  * @param {string} textInput the string to analyze
  *
  * @return {boolean} true if the string is an emojii, othewise false.
  */
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


  /**
  * Starts a new emojii battle, if no other battle is active.
  */
  private startEmojiiBatle() : void
  {
    this.emojiiBatleActive = true;
    // TODO start battle

    // TODO spawn boss

    // TODO declare battle channel
  }

  /**
  * Aborts the current emojii battle, if active
  */
  private abortEmojiiBattle() : void
  {
    this.emojiiBatleActive = false;
    // TODO abort battle
    this.outputHandler.outputToChannel("Battle has been aborted.");
  }

  /**
  * Displays a help message when the user types the help command
  */
  private displayHelp() : void
  {
    if(this.emojiiBatleActive)
    {
      this.outputHandler.outputToChannel(`Cannot display full help options during battle.\n\n
        Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.ABORT_BATTLE_COMMAND}' to abort battle.`);
    }
    else
    {
      this.outputHandler.outputToChannel(`Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.START_BATTLE_COMMAND}' to begin a battle.\n\n
        During a battle, type one emojii character at a time to damage the boss.\n\n
        To gain maximum damage output, complete an UNINTERRUPTED string of emojii to form a combo.\n\n
        For example, if the combo is :banana: :apple: :banana:, you would type:\n\n
        :banana:\n\n
        :apple:\n\n
        :banana:\n\n
        Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.ABORT_BATTLE_COMMAND}' to abort battle.`);
    }
  }

  /**
  * Displays a help message when the user enters an invalid command.
  */
  private displayInvalidCommand() : void
  {
    this.outputHandler.outputToChannel(`Invalid command. For a list of commands, type '${InputHandler.COMMAND_PREFIX} ${InputHandler.HELP_COMMAND}'.`);
  }
}
