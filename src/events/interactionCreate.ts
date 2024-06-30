import { Events } from 'discord.js'
const InteractionCreate : ITypes.IEvent<Events.InteractionCreate> = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
    
        if (!command) {
            console.log('Komut bulunamadı:', interaction.commandName);
            return;
        }
      
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Uygulanmayan komut hatası:', error);
            await interaction.reply({ content: 'Komut uygulanmıyor.', ephemeral: true });
        }
    },    
}

export default InteractionCreate