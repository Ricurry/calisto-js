const Discord = require("discord.js");

const {prefix, token} = require("./Data/config.json")

const client = new Discord.Client();

const mongoose = require('mongoose')

const User = require("./mongodb/GuildMember.js")

var url = "YOUSHALLNOTSEE";
mongoose.connect(url)

var db = mongoose.connection;
db.on('error', () =>
{
    console.log("Couldn't connect to MongoDB!");
    return;
})

/* Go through each user, if one does is verified and has no MongoDB cache, give him one. */
 //message.guild.roles.get('415665311828803584').members.map(m=>m.user.tag);

client.on('message', (message) => 
{
    if (!message.content.startsWith(`${prefix}`)) 
    {
        return;
    }

    if (message.content.startsWith(`${prefix}checkall`)) 
    {
        var common = message.guild.roles.cache.get('415665311828803584').members;
        common.forEach(member => {
            if (!User.collection.findOne( {"userid" : Number(member.id) } )){
                var profile = new User 
                ({
                    _id: mongoose.Types.ObjectId(),
                    userid: member.id,
                    usertag: member.user.tag,
                    notified: false,
                    banned: false,
                    verified: false,
                });
                profile.save();
            }
        });
    }
})

client.login(token);
