const Discord = require("discord.js");


// Notifications On Error.
const onn_error = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setDescription('You already have that role!')
    .setColor('#fc0d8d');

module.exports = (onn_error);