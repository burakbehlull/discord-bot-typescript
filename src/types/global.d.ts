import { SlashCommandBuilder } from "discord.js"

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
    }
}