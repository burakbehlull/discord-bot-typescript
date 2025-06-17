import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import 'dotenv/config'
import { Utils } from '@/base'
class Core extends Client {
    utils = new Utils(this)
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
            ],
			presence: {
                activities: [{ name: "@burakbehull", type: ActivityType.Watching }],
				status: "idle"
            },
			
        });
    }

    connect(){
        this.login(process.env.TOKEN)
        this.utils.loadEvents()
        this.utils.loadPrefixCommands()
        this.utils.loadSlashCommands()
    }
}

export {
    Core as Client
}