import { Client, GatewayIntentBits } from "discord.js";
import 'dotenv/config'
class Core extends Client {
    constructor(){
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildBans, 
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations, 
                GatewayIntentBits.GuildWebhooks, 
                GatewayIntentBits.GuildInvites, 
                GatewayIntentBits.GuildVoiceStates, 
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping, 
                GatewayIntentBits.DirectMessages, 
                GatewayIntentBits.DirectMessageReactions, 
                GatewayIntentBits.DirectMessageTyping, 
                GatewayIntentBits.MessageContent,
            ]
        });
    }

    connect(){
        this.login(process.env.TOKEN)
    }
}

export {
    Core as Client
}