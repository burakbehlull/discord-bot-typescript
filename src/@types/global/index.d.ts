import { ClientEvents, SlashCommandBuilder, Client, Collection, Message, ChatInputCommandInteraction, 
	UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction } from "discord.js"
import { Utils } from "@/base"

export {};

declare global {
    namespace ITypes {
	
		export interface IClient extends Client {
			utils: Utils;
			slashCommands: Collection<string, ISlashCommand>;
			prefixCommands: Collection<string, IPrefixCommand>;
		}
	
		// prefix commands
		export interface IPrefixCommand {
			name: string,
			usage?: string[];
			description?: string;
			execute: (commandArgs: PrefixCommandArgs) => Promise<unknown> | unknown;
		}

		export interface PrefixCommandArgs {
			client: IClient;
			message: Message;
			args?: string[];
		}
		
		// slash commands
        export interface ISlashCommand {
            data: SlashCommandBuilder,
            execute: (interaction: SlashCommandArgs)=> any;
        }
        
        export interface SlashCommandArgs {
			client: IClient,
            interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction;
        }
		
		// events
        export type EventKeys = keyof ClientEvents;
        export interface IEvent<K extends EventKeys> {
            name: EventKeys;
            once?: boolean;
            execute: (client: IClient, ...args: ClientEvents[K]) => Promise<void> | void | any;
        }
    }
}