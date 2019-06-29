# DiscordEmojiiBattle
This discord bot allows players to band together to fight bosses - using emojii

During a battle, type one emojii character at a time to damage the boss.
To gain maximum damage output, complete an UNINTERRUPTED string of emojii to form a combo.
For example, if the combo is :banana: :apple: :banana:, you would type:
:banana:
:apple:
:banana:

SETUP INSTRUCTIONS:
Unfortunately, I cannot host the bot at this time, so I have enclosed detailed instructions for creating a copy.

To setup an empty discord bot:
1) Go to this URL: https://discordapp.com/developers/applications/
2) Click 'New Application'
3) Type 'Emojii Battle Bot' -> Create.
4) Add a Bot User to the application
5) Add the bot to your server using an OAuth2 link. Your OAuth2 link should be similar to the example link below, but you will replace the client_id with the Client ID listed in your newly created application. (Example: https://discordapp.com/api/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=1)

To initialize this bot:
1) Open a terminal in the project root.
2) Perform the following npm installs:
    npm install -g typescript
    npm install discord.js
    npm i @types/node
3) Copy the '/src/secretConfigExample.ts' file to the '/src/secretConfig.ts' location.
4) Set your bot's token in the '/src/secretConfig.ts' file. (Make sure to use the bot secret token, not the application secret token)
5) Type 'tsc' into terminal. (This builds the TypeScript file into JavaScript)
6) Type 'cd dist' into console. (Our source code is in this folder)
7) Type 'node .' into console.

To play the game:
1) Type '.ebb start' into a text channel on your server
2) *Chaos*
