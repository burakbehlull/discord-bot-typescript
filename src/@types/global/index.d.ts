import { ClientEvents, SlashCommandBuilder } from "discord.js"

export {};

declare global {
    namespace ITypes {
        export interface ICommand {
            data: SlashCommandBuilder,
            execute: (interaction:CommandArgs)=> any;
        }
        
        export interface CommandArgs {
            interaction: any;
        }
        export type EventKeys = keyof ClientEvents;
        export interface IEvent<K extends EventKeys> {
            name: EventKeys;
            once: boolean;
            execute: (client: any, ...args: ClientEvents[K]) => Promise<void> | void | any;
        }
    }
}