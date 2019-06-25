import * as Discord from "discord.js";
import * as SecretConfig from "./secretConfig";

const client : Discord.Client = new Discord.Client();

client.on('ready', function(){
  console.log('ready');
})

client.on('message', function(message){
  if(message.content == "hello")
  {
    message.reply("hi");
  }
})

client.login(SecretConfig.BOT_SECRET_KEY);
