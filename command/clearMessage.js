const helper = require('../helper.js');

function clearMessage(message) {
    let messagesDeleted;
    if (message.channel.type === 'text') {
        message.channel.fetchMessages()
            .then(messages => {
                message.channel.bulkDelete(messages);
                messagesDeleted = messages.array().length;
                message.channel.sendMessage("Deletion of messages successful. Total messages deleted: " + messagesDeleted);
                helper.writeLogs(message, '<@' + message.author.id + ">" + ' cleared channel ' + message.channel.name);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = {
    clearMessage
};