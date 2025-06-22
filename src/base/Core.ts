import { Client, GatewayIntentBits, ActivityType, Collection } from "discord.js";
import 'dotenv/config'
import { Utils } from '@/base'
class Core extends Client {
    utils : Utils = new Utils(this)
	slashCommands = new Collection<string, ITypes.ISlashCommand>();
    prefixCommands = new Collection<string, ITypes.IPrefixCommand>();
    constructor(){
        super({
            intents: Object.keys(GatewayIntentBits).map(
			  (intent) => GatewayIntentBits[intent as keyof typeof GatewayIntentBits]
			),
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