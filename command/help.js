const helper = require('../helper.js');
function help(message){
    message.channel.sendMessage("```\nCommands:\n" +
        "!dc - disconnect user \t example:\t- !dc @nick\n" +
        "!mv - move user's to user \texample:\t- !mv @MoveToUser @nick1 @nick2 @nick3 @nick4  or !mv @MoveToUser @nick1\n" +
        "!clearmessage - clear last 50 messages on fetch text channel \t example:\t !clearmessage\n" +
        "!chmv = move user between channels\t example:\t - !chmv FirstChannel SecondChannel\n"+
        "!help - documentation\n" +
        "!serverlist - show voice server list\n" +
        "!setserver - set server\t example:\t- !setserver us-central\n" +
        "```");
    helper.writeLogs(message, '<@' + message.author.id + "> " + 'used help ');
}
module.exports ={
    help
};
