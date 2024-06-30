import { Collection, Routes, REST } from "discord.js";
import 'dotenv/config'
import { readdirSync, existsSync } from "fs";
import { join } from "path";
export class Utils {
    private client:any;
    private ICommands : any[];
    commands = new Collection<string, ITypes.ICommand>()
    rest = new REST({version: '10'}).setToken(`${process.env.TOKEN}`);
    constructor(client:any){
        this.client = client
        this.ICommands = []
    }
    async commandsDeploy(){
        try {
            console.log('Komutanlar yüklenmeye başlandı.');
        
            await this.rest.put(
              Routes.applicationCommands(`${process.env.BOT_ID}`),
              { body: this.ICommands }
            );
        
            console.log('Komutlar başarıyla yüklendi.');
          } catch (error) {
            console.error(error);
          }
    }
    loadCommands(){
        const commandsFilePath = join(__dirname, '..', 'commands')
        if(!existsSync(commandsFilePath)){
            console.error('Commands klasörü mevcut değil.')
            return
        }
        const commandFiles = readdirSync(commandsFilePath).filter((file:any) => file.endsWith('.ts'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if(!command) continue
            const c = command.default?.data
            this.ICommands.push(c.toJSON());
            this.commands.set(c.name, command?.default);
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