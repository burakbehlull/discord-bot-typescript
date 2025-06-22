export default {
    name: 'ping',
    async execute({client, message}:ITypes.PrefixCommandArgs) {
        await message.reply("pong")
    }
} as ITypes.IPrefixCommand