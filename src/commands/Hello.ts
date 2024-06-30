import { SlashCommandBuilder } from "discord.js"

const Hello : ITypes.ICommand = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('say hello!'),
    async execute(interaction :any) {
        await interaction.reply("hello there!")
    },
}

export default Hello