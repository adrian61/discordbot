const helper = require('../helper.js');

async function dc(message) {

    try {
        if (helper.checkIfMentionsInsideVoiceChannel(message)) return;
        const temp_channel = await message.guild.createChannel(`Talk ${message.member.displayName}`, 'voice', [
            {
                type: "member",
                id: message.member.id,
                deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
            },
            {
                type: "role",
                id: message.guild.defaultRole,
                deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
            }
        ]);
        const userToDisconnect = message.mentions.members.first();
        await userToDisconnect.setVoiceChannel(temp_channel).catch(error => message.reply(`Sorry, an error occured.`));
        await temp_channel.delete();
        message.reply('disconnected user <@' + userToDisconnect.id + ">.");
        helper.writeLogs(message, '<@' + message.author.id + ">" + 'disconnected user <@' + userToDisconnect.id + ">.");
    } catch (e) {
        console.log(e);

    }
}

module.exports = {
    dc
};