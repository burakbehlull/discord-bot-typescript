import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";
import "dotenv/config";

export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
	const files = readdirSync(dirPath);

	for (const file of files) {
		const fullPath = join(dirPath, file);
		if (statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, arrayOfFiles);
		} else if (file.endsWith(".ts")) {
			arrayOfFiles.push(fullPath);
		}
	}

	return arrayOfFiles;
}

export class Utils {
	private client: ITypes.IClient;

	constructor(client: ITypes.IClient) {
		this.client = client;
	}

	loadPrefixCommands() {
		const commandsFilePath = join(__dirname, "..", "commands", "prefix-commands");
		if (!existsSync(commandsFilePath)) {
			console.error("Prefix komut klasörü mevcut değil.");
			return;
		}

		const commandFiles = getAllFiles(commandsFilePath);

		for (const filePath of commandFiles) {
			const command = require(filePath);
			if (!command) continue;
			const c = command.default;
			this.client.prefixCommands.set(c.name, c);
		}

		console.log(`[${this.client.prefixCommands.size}] prefix komutu yüklendi.`);
	}

	loadSlashCommands() {
		const commandsFilePath = join(__dirname, "..", "commands", "slash-commands");
		if (!existsSync(commandsFilePath)) {
			console.error("Slash komut klasörü mevcut değil.");
			return;
		}

		const commandFiles = getAllFiles(commandsFilePath);

		for (const filePath of commandFiles) {
			const command = require(filePath);
			if (!command) continue;
			const c = command.default?.data;
			this.client.slashCommands.set(c.name, command.default);
		}

		console.log(`[${this.client.slashCommands.size}] slash komutu yüklendi.`);
	}

	loadEvents() {
		const eventsFilePath = join(__dirname, "..", "events");
		if (!existsSync(eventsFilePath)) {
			console.error("Events klasörü mevcut değil.");
			return;
		}

		const eventFiles = getAllFiles(eventsFilePath);

		for (const filePath of eventFiles) {
			const eventFile = require(filePath);
			const event = eventFile?.default;
			if (!event || !event.name || typeof event.execute !== "function") continue;

			if (event.once) {
				this.client.once(event.name, (...args: unknown[]) =>
					event.execute(this.client, ...args)
				);
			} else {
				this.client.on(event.name, (...args: unknown[]) =>
					event.execute(this.client, ...args)
				);
			}
		}

		console.log(`[${eventFiles.length}] event yüklendi.`);
	}

	login(){
		const { TOKEN } = process.env as Record<string, string>;
		if (!TOKEN) {
			console.error("TOKEN çevresel değişkeni tanımlanmamış.");
			return
		}
		this.client.login(TOKEN)
	}
}
