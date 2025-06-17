import { SlashCommandBuilder } from "discord.js"

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('example command!'),
    async execute({client, interaction}:ITypes.SlashCommandArgs) {
        await interaction.reply("pong")
    },
} as ITypes.ISlashCommand