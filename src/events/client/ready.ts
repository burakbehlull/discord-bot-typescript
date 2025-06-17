import { Events } from "discord.js";

export default {
    name: 'ready',
    once: true,
    execute(client, interaction) {
        console.log(`${interaction.user.tag} hazır!`)
    },
} as ITypes.IEvent<Events.ClientReady>