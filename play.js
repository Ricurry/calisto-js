const Discord = require("discord.js");

const ytdl = require('ytdl-core');

const { prefix, token } = require("./Data/config.json");

const client = new Discord.Client();


/* Play a URL or searched video. */

// save states of player as variables

// default of isPlaying is false.
var isPlaying;

var queue = {
    audio: []
}

client.on("ready", () =>  
{
    console.log("play.js online.")
})

client.on ("message",  async message => {
    if (!message.content.startsWith(`${prefix}`)) // if message does not start with prefix.
    {
        return;
    }
    if (message.content.startsWith (`${prefix}url`)) // if user wants to play url
    {
        var split = message.content.split(" ");
        var url =  split[1];
        if (url.startsWith("https:")) 
        {
            play(url, message) 
        } // If it is an URL.
        else 
        {
            message.channel.send({ embed: 
                {
                    title: 'Calisto: Error!',
                    description: 'URL Not Proper!',
                    color: ('#fc0d8d')
                }});
            return; 
        }
    }
})


async function play (url, message)  
{   
    if (!message.member.voice.channel) 
    { 
        message.channel.send({ embed: 
        {
            title: 'Calisto: Error!',
            description: 'Must be in a channel!',
            color: ('#fc0d8d')
          }});
        return;
    }
    else 
    {
        user_connected = true;
        var connection = await message.member.voice.channel.join();
    }
    const audio = await ytdl.getInfo(url);

    var load =  
    {
        queue: [], 
        title: audio.videoDetails.title,
        duration: audio.videoDetails.lengthSeconds,
        url: audio.videoDetails.video_url,
    };

    if (load.duration > 1800) 
    {
        message.reply({  embed: {
            title: 'Calisto: Error!',
            description: 'Song is too long! Try something less than 30 minutes.',
            color: ('#fc0d8d')
          }});
     }

     if (isPlaying === true) // if music is already playing.
     {
         message.reply({  embed: {
             title: `Calisto: Queued:`,
             description: `${load.title}`,
             color: ('#fc0d8d')
           }});
         queue.audio.push(url); // push url to queue.
         console.log(queue.audio.length)
         return;
     }

    if (connection) 
    {
        isPlaying = true;
        message.reply({embed: 
            {
                title: 'Calisto: Now Playing: ',
                description: `${load.title}`,
                color: ('#fc0d8d')
        }});

        const dispatch = connection.play(ytdl(load.url , {filter: 'audioonly', format: 'webm', quality: "highestaudio"})).on("finish", async () => 
        {
            if (queue.audio.length == queue.audio.length > 0) 
            {
                isPlaying = false;
                console.log("called on!");
                play(queue.audio.shift(), message);
            }
        })
        dispatch.setVolumeLogarithmic(dispatch.volume / 5);
    }
    else 
    {
        isPlaying = false;
    }
}


client.login(token);