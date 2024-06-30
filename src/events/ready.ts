import { Events } from "discord.js";

const Ready : ITypes.IEvent<Events.ClientReady> = {
    name: 'ready',
    once: true,
    execute(client, interaction) {
        console.log(`${interaction.user.tag} hazır!`)
    },
} 
export default Ready