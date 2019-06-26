import * as Discord from "discord.js";
import * as SecretConfig from "./secretConfig";

import {InputHandler} from "./inputHandler";

const client : Discord.Client = new Discord.Client();
const inputHandler : InputHandler = new InputHandler();

client.on('ready', function(){
  console.log('ready');
})

client.on('message', function(message){
  inputHandler.handleInput(message);
})

// TODO logout message

client.login(SecretConfig.BOT_SECRET_KEY);
