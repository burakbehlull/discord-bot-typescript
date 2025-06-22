import 'dotenv/config';
import { Routes, REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { existsSync } from "fs";
import { join } from "path";

import { getAllFiles } from "@/base"


async function commandsDeploy() {
    const { BOT_ID, TOKEN } = process.env as Record<string, string>;

    if (!BOT_ID || !TOKEN) {
        console.error('BOT_ID veya TOKEN çevresel değişkenleri tanımlanmamış.');
        return;
    }

    try {
		const ISlashCommands : RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
		const rest = new REST({ version: '10' }).setToken(TOKEN);
	
		const commandsFilePath = join(__dirname, '.', 'commands', 'slash-commands');
        if (!existsSync(commandsFilePath)) {
            console.error('Slash komut klasörü mevcut değil.');
            return;
        }

        const commandFiles = getAllFiles(commandsFilePath);

        for (const filePath of commandFiles) {
            const command = require(filePath);
            if (!command) continue;
            const c = command.default?.data;
            ISlashCommands.push(c.toJSON());
        }

	
        await rest.put(
			Routes.applicationCommands(BOT_ID),
			{ body: ISlashCommands }
        );
        console.log(`[${ISlashCommands.length ?? 0}] slash komutu başarıyla Discord API'ye yüklendi.`);
    } catch (error) {
        console.error('Slash komutları yüklenirken hata oluştu:', error);
   }
}

commandsDeploy()