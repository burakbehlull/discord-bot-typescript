import { ClientEvents, SlashCommandBuilder, Client, Message, ChatInputCommandInteraction } from "discord.js"

export {};

declare global {
    namespace ITypes {
	
		// prefix commands
		export interface IPrefixCommand {
			name: string,
			usage?: string[];
			description?: string;
			execute: (commandArgs: PrefixCommandArgs) => Promise<unknown> | unknown;
		}

		export interface PrefixCommandArgs {
			client: Client;
			message: Message;
			args?: string[];
		}
		
		// slash commands
        export interface ISlashCommand {
            data: SlashCommandBuilder,
            execute: (interaction: SlashCommandArgs)=> any;
        }
        
        export interface SlashCommandArgs {
			client: Client,
            interaction: ChatInputCommandInteraction;
        }
		
		// events
        export type EventKeys = keyof ClientEvents;
        export interface IEvent<K extends EventKeys> {
            name: EventKeys;
            once?: boolean;
            execute: (client: Client, ...args: ClientEvents[K]) => Promise<void> | void | any;
        }
    }
}