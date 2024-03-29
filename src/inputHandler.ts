import * as Discord from "discord.js";
import {Boss} from "./boss";

export class InputHandler
{
  private static readonly COMMAND_PREFIX : string = ".ebb";
  private static readonly START_BATTLE_COMMAND : string= "start"; // TODO alternate phrasings
  private static readonly START_FAST_BATTLE_COMMAND : string= "start fast";
  private static readonly ABORT_BATTLE_COMMAND : string = "abort"; // TODO alternate phrasings
  private static readonly HELP_COMMAND : string = "help"; // TODO alternate phrasings

  private emojiiBattleActive: boolean;
  private boss : any; // Had to turn off type checking, since Discord's message classes don't have default initializers

  // TODO currently boss battle can only take place in one channel at a time
  constructor ()
  {
    this.emojiiBattleActive = false;
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
    // handle boss early defeat
    // TODO implement in a more graceful way, e.g. listener or referenced variable
    if(this.emojiiBattleActive && this.boss.getEncounterHasEnded())
    {
      this.emojiiBattleActive = false;
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
        this.abortEmojiiBattle(message.channel);
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
    else if(this.emojiiBattleActive && message.channel.id == this.boss.getBossChannelId()
      && InputHandler.isEmojii(textInput))
    {
      // Handle boss fight commands
      this.boss.handleEmojiiInput(textInput, message.author.username);
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
    // Discord emojii rules for chat:
    // at least two characters long
    // can only contain alphanumeric characters and underscores
    // THESE ARE NOT WHAT WE RECEIVE THOUGH

    // We receive Unicode emojii
    const STANDARD_EMOJII_REGEX = new RegExp("..?");

    // We also receive discord custom emojii
    const CUSTOM_EMOJII_REGEX = new RegExp("<a?:\\w+\\w+:\\d*>");

    // Test message contents
    let isEmojii = false;

    // test for standard emojii
    let regexMatches : RegExpMatchArray | null = textInput.match(STANDARD_EMOJII_REGEX);
    if (regexMatches && regexMatches.length == 1 && regexMatches[0] == textInput)
    {
      isEmojii = true;
    }

    // Test for custom emojii
    if(!isEmojii)
    {
      regexMatches = textInput.match(CUSTOM_EMOJII_REGEX);
      if (regexMatches && regexMatches.length == 1 && regexMatches[0] == textInput)
      {
        isEmojii = true;
      }
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
    if(!this.emojiiBattleActive)
    {
      this.emojiiBattleActive = true;
      this.boss = new Boss(channel);
      this.boss.spawn();
    }
    else
    {
        channel.send("Cannot start battle. Battle is already active.\n\nType '.ebb abort' to abort current battle.");
    }
  }

  /**
  * Aborts the current emojii battle, if active
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel the battle will take place in.
  */
  private abortEmojiiBattle(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) : void
  {
    if(this.emojiiBattleActive)
    {
      this.boss.abort(); //TODO await?
      this.emojiiBattleActive = false;
    }
    else
    {
        channel.send("Cannot abort battle. No battle is active.\n\nType '.ebb start' to begin battle.");
    }
  }

  /**
  * Displays a help message when the user types the help command
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel to reply in.
  */
  private displayHelp(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) : void
  {
    if(this.emojiiBattleActive)
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
