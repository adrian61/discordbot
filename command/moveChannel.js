const helper = require('../helper.js');
const standardMessages = require('../standardMessages');

async function moveChannel(args, message) {
    let fromVoiceChannelName = helper.getChannelByName(message, args[0]);
    let toVoiceChannelName = helper.getChannelByName(message, args[1]);
    if (fromVoiceChannelName === null || toVoiceChannelName === null) return message.reply(standardMessages.MOVE_TO_CHANNEL_IS_NOT_EXIST);
    if (toVoiceChannelName.type === 'text' || fromVoiceChannelName.type === 'text') return message.reply(standardMessages.MOVE_TO_TEXT_CHANNEL);
    if (fromVoiceChannelName === toVoiceChannelName) return message.reply(standardMessages.MOVE_TO_THIS_SAME_CHANNEL);
    if (fromVoiceChannelName.members.array().length < 1) return message.reply('No users inside the channel');
    const userIdsToMove = await fromVoiceChannelName.members.map(({id}) => id);
    let messageToSend = '';
    for (let i = 0; i < userIdsToMove.length; i++) {
        let user = userIdsToMove[i];
        message.guild.member(user).setVoiceChannel(toVoiceChannelName.id).catch(err => {
            return message.reply(standardMessages.CATCH_INDEX_ERROR)
        });
        messageToSend += 'moved user: <@' + user + ">\n";
    }
    helper.writeLogs(message, '<@' + message.author.id + "> used move between channels: "+ args[0]+' ' +args[1] + '\n' + messageToSend);
    return message.reply(messageToSend);

}

module.exports = {
    moveChannel
};