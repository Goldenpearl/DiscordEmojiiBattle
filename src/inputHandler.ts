import * as Discord from "discord.js";
import {Boss} from "./boss";

export class InputHandler
{
  private static readonly COMMAND_PREFIX : string = ".ebb";
  private static readonly START_BATTLE_COMMAND : string= "start";
  private static readonly ABORT_BATTLE_COMMAND : string = "abort";
  private static readonly HELP_COMMAND : string = "help";

  private emojiiBatleActive: boolean;
  private boss : any; // Had to turn off type checking, since Discord's message classes don't have default initializers

  // TODO currently boss battle can only take place in one channel at a time
  constructor ()
  {
    this.emojiiBatleActive = false;
    this.boss = null;
  };

  /**
  * Handles all potential command input strings
  * @param {string} textInput the string to process.
  * @param {string} username the name of the user who entered the command.
  */
  public handleInput(message : Discord.Message) : void
  {
    let textInput:string = message.content;
    if(textInput == "hello")
    {
      message.reply("hi");
    }

    // handle boss early defeat
    // TODO implement in a more graceful way, e.g. listener or referenced variable
    if(this.emojiiBatleActive && this.boss.isBossAlive())
    {
      this.emojiiBatleActive = false;
      this.boss = null;
    }

    if(textInput.startsWith(InputHandler.COMMAND_PREFIX + " "))
    {
      let commandStr = textInput.slice(InputHandler.COMMAND_PREFIX.length + 1); // Removes the command prefix, and the space.
      if(commandStr == InputHandler.START_BATTLE_COMMAND)
      {
        this.startEmojiiBatle(message.channel);
      }
      else if (commandStr == InputHandler.ABORT_BATTLE_COMMAND)
      {
        this.abortEmojiiBattle();
      }
      else if (commandStr == InputHandler.HELP_COMMAND)
      {
        this.displayHelp(message.channel);
      }
      else
      {
        this.displayInvalidCommand(message.channel);
      }
    }
    else if(this.emojiiBatleActive && message.channel.id == this.boss.getBossChannelId()
      //&& InputHandler.isEmojii(textInput))
    )
    {
      message.reply("used an emojii");
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
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel the battle will take place in.
  */
  private startEmojiiBatle(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) : void
  {
    this.emojiiBatleActive = true;
    this.boss = new Boss(channel);
    this.boss.spawn();
    // TODO start battle

    // TODO spawn boss

    // TODO declare battle channel
  }

  /**
  * Aborts the current emojii battle, if active
  */
  private abortEmojiiBattle() : void
  {
    this.boss.abort(); //TODO await?
    this.emojiiBatleActive = false;
  }

  /**
  * Displays a help message when the user types the help command
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel to reply in.
  */
  private displayHelp(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) : void
  {
    if(this.emojiiBatleActive)
    {
      channel.send("Cannot display full help options during battle.\n\n"+
        `Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.ABORT_BATTLE_COMMAND}' to abort battle.`);
    }
    else
    {
        channel.send(`Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.START_BATTLE_COMMAND}' to begin a battle.\n\n`+
        "During a battle, type one emojii character at a time to damage the boss.\n\n"+
        "To gain maximum damage output, complete an UNINTERRUPTED string of emojii to form a combo.\n\n"+
        "For example, if the combo is :banana: :apple: :banana:, you would type:\n\n"+
        ":banana:\n\n"+
        ":apple:\n\n"+
        ":banana:\n\n"+
        `Type '${InputHandler.COMMAND_PREFIX} ${InputHandler.ABORT_BATTLE_COMMAND}' to abort battle.`);
    }
  }

  /**
  * Displays a help message when the user enters an invalid command.
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel to reply in.
  */
  private displayInvalidCommand(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) : void
  {
  channel.send(`Invalid command.\n\nFor a list of commands, type '${InputHandler.COMMAND_PREFIX} ${InputHandler.HELP_COMMAND}'.`);
  }
}
