import { Client as DiscordClient, GatewayIntentBits, ActivityType, Collection } from "discord.js";
import { Utils } from "@/base";

class Core extends DiscordClient implements ITypes.IClient {
	utils : Utils = new Utils(this);
	slashCommands = new Collection<string, ITypes.ISlashCommand>();
	prefixCommands = new Collection<string, ITypes.IPrefixCommand>();

	constructor() {
		super({
			intents: Object.keys(GatewayIntentBits).map(
				(i) => GatewayIntentBits[i as keyof typeof GatewayIntentBits]
			),
			presence: {
				activities: [{ name: "@burakbehull", type: ActivityType.Watching }],
				status: "idle",
			},
			
		});
	}

	connect() {
		this.utils.login()
		this.utils.loadEvents();
		this.utils.loadPrefixCommands();
		this.utils.loadSlashCommands();
	}
}

export { Core as Client };
