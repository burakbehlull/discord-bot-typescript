import { Events } from 'discord.js'

const MessageCreate: ITypes.IEvent<Events.MessageCreate> = {
  name: 'messageCreate',
  async execute(client, message) {
    const prefix = "."

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandNameRaw = args.shift();

    if (!commandNameRaw) return;

    const commandName = commandNameRaw.toLowerCase();
    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
      await command.execute({ client, message, args, command: commandName });
    } catch (error) {
      console.error(`❌ Error executing command: ${commandName}`, error);
      message.channel.send('❌ Komut çalıştırılırken bir hata oluştu.');
    }
  },
}

export default MessageCreate
