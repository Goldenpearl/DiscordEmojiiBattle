# DiscordEmojiiBattle
This discord bot allows players to band together to fight bosses - using emojii

To add the bot to the server, use this URL:
https://discordapp.com/api/oauth2/authorize?client_id=592873783845584926&scope=bot&permissions=1

To initialize this bot:
1) Open a terminal in the project root.
2) Perform the following npm installs:
    npm install -g typescript
    npm install discord.js
    npm i @types/node
3) Copy the '/src/secretConfigExample.ts' file to the '/src/secretConfig.ts' location.
4) Set your bot's token in the '/src/secretConfig.ts' file.
5) Type 'tsc' into terminal. (This builds the TypeScript file into JavaScript)
6) Type 'cd dist' into console. (Our source code is in this folder)
7) Type 'node .' into console.

To play the game:
1) Invite the bot to your server
2) Start a server up with the bot running
3) Type '.ebb start' into a text channel on your server
