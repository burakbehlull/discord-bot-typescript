import { Collection, Routes, REST, Client } from "discord.js";
import 'dotenv/config'
import { readdirSync, existsSync } from "fs";
import { join } from "path";
export class Utils {
    private client: Client | any;
    private ISlashCommands : any[];
    slashCommands = new Collection<string, ITypes.ISlashCommand>()
    prefixCommands = new Collection<string, ITypes.IPrefixCommand>()
    rest = new REST({version: '10'}).setToken(`${process.env.TOKEN}`);
	
    constructor(client: Client){
        this.client = client
        this.ISlashCommands = []
    }
    async commandsDeploy(){
        try {
            await this.rest.put(
              Routes.applicationCommands(`${process.env.BOT_ID}`),
              { body: this.ISlashCommands }
            );
        
            console.log('Komutlar başarıyla yüklendi.');
          } catch (error) {
            console.error(error);
          }
    }
	loadPrefixCommands(){
        const commandsFilePath = join(__dirname, '..', 'commands', 'prefix-commands')
        if(!existsSync(commandsFilePath)){
            console.error('Commands klasörü mevcut değil.')
            return
        }
        const commandFiles = readdirSync(commandsFilePath).filter((file:any) => file.endsWith('.ts'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/prefix-commands/${file}`);
            if(!command) continue
            const c = command.default
            this.prefixCommands.set(c.name, command?.default);
        }
    }
    loadSlashCommands(){
        const commandsFilePath = join(__dirname, '..', 'commands', 'slash-commands')
        if(!existsSync(commandsFilePath)){
            console.error('Commands klasörü mevcut değil.')
            return
        }
        const commandFiles = readdirSync(commandsFilePath).filter((file:any) => file.endsWith('.ts'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/slash-commands/${file}`);
            if(!command) continue
            const c = command.default?.data
            this.ISlashCommands.push(c.toJSON());
            this.slashCommands.set(c.name, command?.default);
        }
        this.commandsDeploy()
    
    }
    loadEvents(){
        const eventsFilePath = join(__dirname, '..', 'events')
        if(!existsSync(eventsFilePath)){
            console.error('Events klasörü mevcut değil.')
            return
        }
        const eventFiles = readdirSync(eventsFilePath).filter(file => file.endsWith('.ts'));
        for (const file of eventFiles) {
            const eventFile = require(`../events/${file}`);
            const event = eventFile?.default
            if(!event) continue;
            if (event?.once) {
                this.client.once(event.name, (...args: unknown[]) => event.execute(this, ...args));
            } else {
                this.client.on(event.name, (...args: unknown[]) => event.execute(this, ...args));
            }
        }
    }
}