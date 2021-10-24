const Discord = require("discord.js");

// Notifications Off Error.
const off_error = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setDescription('Notifications are already off!')
    .setColor('#fc0d8d');

module.exports = (off_error);