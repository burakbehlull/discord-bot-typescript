import { Collection, Routes, REST } from "discord.js";
import fs from 'fs'
import path from 'path'
import 'dotenv/config'
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
        
        const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands')).filter((file:any) => file.endsWith('.ts'));

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
        const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.ts'));

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