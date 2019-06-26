import * as Discord from "discord.js";

export class OutputHandler
{
  private channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel;

  /**
  * Constructs an OutputHandler, which can write to a channel
  * @param {Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel} channel
           the channel the OutputHandler will write to.
  */
  constructor(channel : Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel)
  {
    this.channel = channel;
  }

  /**
  * Outputs the message to the stored channel.
  * @param {string} message the string to output to the stored channel.
  */
  public outputToChannel(message: string) : void
  {
    this.channel.send(message);
  }
}
