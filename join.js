const Discord = require("discord.js");

const {prefix, token} = require("./Data/config.json")

const client = new Discord.Client();

const mongoose = require('mongoose')

const User = require("./mongodb/GuildMember.js")

var url = "mongodb+srv://admin:o684CaDedK60T4xh@calisto-js.unhgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url)

var db = mongoose.connection;

db.on('error', () =>
{
    console.log("Couldn't connect to MongoDB!");
    return;
})

console.log("Connected to MongoDB.");

/* On join give a person a MongoID. */

client.on('guildMemberAdd', member => {
    member.send({  embed: {
        title: `Welcome to Guild Apollo!`,
        description: `Verify yourself by typing %verify in #verify channel!`,
        color: ('#fc0d8d')
    }});
    member.roles.add("801880915486965772");
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
 });

 client.on('message', function(message) {
    if (!message.content.startsWith(`${prefix}`)) 
    {
        return;
    }

    if (message.content.startsWith(`${prefix}verify`)) 
    {
        member.reply({  embed: {
            title: `Verified!`,
            description: `You are now verified!`,
            color: ('#fc0d8d')
        }});
        User.collection.updateOne( {"verify" : Boolean(true) } );
    }
 })

 client.on("guildMemberRemove", member =>{
    User.collection.deleteOne( {"userid" : Number(member.id) } );
});

 client.login(token);