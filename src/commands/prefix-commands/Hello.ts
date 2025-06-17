import { SlashCommandBuilder } from "discord.js"

const Hello : ITypes.IPrefixCommand = {
    name: 'hello',
    async execute({client, message}:ITypes.PrefixCommandArgs) {
        await message.reply("hello im prefix command")
    }
}

export default Hello