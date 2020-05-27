const Discord = require('discord.js');
const commandDisconnect = require('./command/disconnect.js');
const commandHelp = require('./command/help.js');
const commandMove = require('./command/move.js');
const commandClearMessage = require('./command/clearMessage.js');
const standardMessages = require('./standardMessages.js');
const commandMoveChannel = require('./command/moveChannel.js');
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const client = new Discord.Client();

client.on('message', message => {

    if (!message.content.startsWith(prefix)) return;
    const withoutPrefix = message.content.slice(prefix.length);
    const split = withoutPrefix.split(/ +/);
    const command = split[0];
    const args = split.slice(1);
    const logs = message.guild.channels.find(channel => channel.name === "logs");
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        message.guild.createChannel('logs', 'text', [{
            id: message.guild.defaultRole.id,
            deny: 805829713,
            allow: 0
        }]);
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions.')
    }
    if (command === 'mv') {
        commandMove.move(client, message, args);
    }
    if (command === 'dc') {
        commandDisconnect.dc(message).catch(err => {
            return message.reply(standardMessages.CATCH_INDEX_ERROR)
        })
    }
    if (command === 'clearmessage') {
        commandClearMessage.clearMessage(message);
    }
    if (command === 'help') {
        commandHelp.help(message);
    }
    if (command === 'chmv') {
        commandMoveChannel.moveChannel(args, message);
    }
    if (command === 'xd') {
        let channel = client.channels.find(ch => ch.name === 'main');
        channel.send('You won a voucher for a coronavirus test.');
    }
    if (command === 'serverlist') {
        let channel = client.channels.find(ch => ch.name === 'main');
        channel.send(message.guild.fetchVoiceRegions());
    }
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        let channel = client.channels.find(ch => ch.name === 'general');
        channel.send('<@' + newMember.user.id + ">" + ' joined to the Voice Channel ' + newMember.guild.member(newMember.user.id).voiceChannel.name);
    } else if (newUserChannel === undefined) {
        let channel = client.channels.find(ch => ch.name === 'general');
        channel.send('<@' + newMember.user.id + ">" + ' disconnected from the server. ');
    }
});


client.login(token);