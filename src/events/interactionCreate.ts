import { Events } from 'discord.js'

export default {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.slashCommands.get(interaction.commandName);
    
        if (!command) {
            console.log('Komut bulunamadı:', interaction.commandName);
            return;
        }
      
        try {
            await command.execute({client, interaction});
        } catch (error) {
            console.error('Uygulanmayan komut hatası:', error);
            await interaction.reply({ content: 'Komut uygulanmıyor.', ephemeral: true });
        }
    },    
} as ITypes.IEvent<Events.InteractionCreate>