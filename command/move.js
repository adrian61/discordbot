const standardMessages = require('../standardMessages');
const helper = require('../helper.js');

function move(client, message, args) {
    let messageMentions = message.mentions.users.array()
    const userIdsToMove = messageMentions.map(({id}) => id);
    if (helper.checkHowManyMoveUsers(message, messageMentions.map(({id}) => id))) return;
    const userToMove = getUserFromMention(client, args[0]);
    if (helper.checkIfInsideVoiceChannel(message, userToMove)) return message.reply(standardMessages.MOVE_NOT_CONNECTED_USER);
    let messageToSend = '\n';
    for (let i = 1; i < userIdsToMove.length; i++) {
        let user = getUserFromMention(client, args[i]);
        if (helper.checkIfTryingMoveToYourself(getUserFromMention(client, args[0]), getUserFromMention(client, args[i]))) messageToSend += 'You tried move to yourself\n';
        else if (helper.checkIfInsideVoiceChannel(message, user)) messageToSend += 'not connected to any voice channel: <@' + user.id + ">\n";
        else if (helper.checkIfInsideThisSameVoiceChannel(message, userToMove, user)) messageToSend += 'is on the same voice channel: <@' + user.id + ">\n";
        else {
            message.guild.member(user).setVoiceChannel(message.guild.member(userToMove).voiceChannelID).catch(err => {
                return message.reply(standardMessages.CATCH_INDEX_ERROR)
            });
            messageToSend += 'moved user: <@' + user.id + ">\n";
        }
    }
    helper.writeLogs(message, '<@' + message.author.id + "> used move users from " + '<@' + userToMove.id + ">\n Results:" + messageToSend);
    return message.reply(messageToSend);
}

function getUserFromMention(client, mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.get(mention);
    }
}

module.exports = {
    move
};