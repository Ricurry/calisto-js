const Discord = require("discord.js");

const notifs_on = require("./embed/notifs/notif_on")
const notifs_off = require("./embed/notifs/notif_off")
const notifs_er1 = require("./embed/notifs/notif_er1")
const notifs_er2 = require("./embed/notifs/notif_er1")

const { prefix, token } = require("./Data/config.json");

const client = new Discord.Client();

client.on('ready',  () => 
{
    console.log("notifs.js online.");
});

client.on('message', function(message)  
{
    if (!message.content.startsWith(`${prefix}`)) 
    {
        return;
    }
    
    if (message.content.startsWith(`${prefix}enable-notifs`)) 
    {
        if (message.member.roles.cache.has("889392553332449360")) 
        {
            message.reply({embed: notifs_er1});
        }
        else 
        {
            message.reply({embed: notifs_on});
        }
    }

    if (message.content.startsWith(`${prefix}disable-notifs`)) 
    {
        if (!message.member.roles.cache.has("889392553332449360")) 
        {
            message.reply({embed: notifs_er2});
        }
        else 
        {
            message.reply({embed: notifs_off});
        }
    }
});


client.login(token);