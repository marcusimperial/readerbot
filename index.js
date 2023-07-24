import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { read } from 'read-last-lines';
import { watchFile } from 'fs'; 

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;
const filePath = process.env.FILE_PATH;

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

watchFile(filePath, { interval: 0 } , async () => {
    const content = await read(filePath, 1);
    if (!content || typeof content !== 'string') return;
    const channel = await client.channels.fetch(guildId);
    if (!channel || typeof channel !== 'object') return;
    channel.send({ content });
    console.log(content);
});


client.login(token);