import { SlashCommandBuilder } from "discord.js"

const Hello : ITypes.ISlashCommand = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('say hello!'),
    async execute({client, interaction}:ITypes.SlashCommandArgs) {
        await interaction.reply("hello there!")
    },
}

export default Hello