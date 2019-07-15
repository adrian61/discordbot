const standardMessages = require('./standardMessages');

function checkIfMentionsInsideVoiceChannel(message) {
    if (message.mentions.members.first().voiceChannelID === undefined || message.mentions.members.first() === null) {
        message.reply(standardMessages.DISCONNECT_NOT_CONNECTED_USER);
        return 1;
    }
    return 0;
}

function checkIfInsideVoiceChannel(message, User) {
    if (message.guild.member(User).voiceChannelID === undefined || message.guild.member(User).voiceChannelID === null) {
        return 1;
    }
    return 0;
}

function checkIfInsideThisSameVoiceChannel(message, User, User2) {
    if (message.guild.member(User).voiceChannelID === message.guild.member(User2).voiceChannelID) {
        return 1;
    }
    return 0;
}


function checkIfTryingMoveToYourself(User1, User2) {
    if (User1 === User2) {
        return 1;
    }
    return 0;
}

function checkHowManyMoveUsers(message, userIdsToMove) {
    if (userIdsToMove.length <= 1) {
        message.reply(standardMessages.MOVE_NOT_ARGUMENTS);
        return 1;
    }
    return 0;
}

function getChannelByName(message, findByName) {
    let voiceChannel = message.guild.channels.find(channel => channel.id === findByName);
    if (voiceChannel === null) {
        voiceChannel = message.guild.channels.find(channel => channel.name.toLowerCase() === findByName.toLowerCase() && channel.type === 'voice')
    }
    return voiceChannel
}
function writeLogs(message, log){
    let channel= message.guild.channels.find(channel => channel.name === "logs");
    channel.send(log);
}

module.exports = {
    checkIfMentionsInsideVoiceChannel,
    checkIfInsideVoiceChannel,
    checkIfInsideThisSameVoiceChannel,
    checkIfTryingMoveToYourself,
    writeLogs,
    checkHowManyMoveUsers,
    getChannelByName

};