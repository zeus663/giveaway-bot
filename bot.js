// EVERYTHING BELOW THIS LINE IS REQUIRED DO NOT CHANGE ANY OF THIS UNLESS YOU KNOW WHAT YOU ARE DOING
// THESE ARE REQUIRED TO HELP THE BOT FUNCTION PROPERLY.
const Discord = require("discord.js");
const PREFIX = process.env.PREFIX;
const embedColor = require ('./config');
const client = new Discord.Client();
const perms = new Discord.RichEmbed()
const noChan = new Discord.RichEmbed()
const chanEmbed = new Discord.RichEmbed()
const gTime = new Discord.RichEmbed()
const presentEmbed = new Discord.RichEmbed()
const titleEmbed = new Discord.RichEmbed()


// BELOW THIS LINE IS THE CLEAN FUNCTION DO NOT TOUCH THIS UNLESS YOU KNOW WHAT YOU ARE DOING!!!
// FUNCTIONS ARE REQUIRED TO EXECUTE ARGS AND STRINGS 
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}	
	  
// BELOW THIS LINE ARE THE BOTS "CONFIG VARS/VARIABLES" THEY ARE REQUIRED TO HELP IT RUN CORRECTLY ONLY REPLACE THESE WITH YOUR INFORMATION DO NOT DELETE THEM AS IT MAY CAUSE ISSUES OR BREAK THE BOT 
// MAKE SURE YOU ENTER THE CORRECT INFORMATION PROVIDING THE WRONG DISCORD ID COULD GIVE SOMEONE ELSE ACCESS TO THE BOTS OWNER ONLY COMMANDS (OWNER ONLY COMMANDS COMING SOON)
var prefix = process.env.PREFIX; // Replace "process.env.PREFIX" with prefix of your choice if self hosting (Not Auto Deployed) Currrnt Prefix: (`tb/`) make sure you include the "(``)"
var token = process.env.BOT_TOKEN; // Replace "process.env.BOT_TOKE" with your bot token if self hosting (Not Auto Deployed) Example: (`Nakdndyak13816akd.odb`) make sure you include the "(``)"

// BELOW THIS LINE IS THE BOTS CONSOLE LOG READY MESSAGE, PLAY STATUS (NOW STREAMING) AND THE MESSAGE THAT IS SENT WHEN INVITED TO A NEW SERVER!!!
// YOU CAN CHANGE, DELETE OR EDIT THIS AS YOU WOULD LIKE BUT IT DOES GIVE THE BOT A NICE CLEAN LOOK 
client.on("ready", () => {
  console.log("Giveaways | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`🎉 -g help 🎉`, `https://www.twitch.tv/monstercat`);
});

client.on('message',async message => {
    
const moment = require('moment'); //npm i moment
const ms = require('ms') //npm i ms

  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room = "";
  var title = "";
  var present = "";
  var duration = "";
  var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
 
var filter = m => m.author.id === message.author.id;
  
// Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

 perms.setTitle("MISSING PERMISSIONS")
 perms.setDescription("I am missing the ``MANAGE_GUILD`` Permissions")

 chanEmbed.setTitle("Giveaway: Step 1")
 chanEmbed.setDescription("Tell me the name of the channel to host the Giveaway in")
 chanEmbed.addField("Example", "```general-chat```");

 noChan.setTitle("Channel Doesnt Exist")
 noChan.setDescription("Sorry, I couldnt find that channel make sure you arent tagging the channel")
 
 gTime.setTitle("Giveaway: Step 2")
 gTime.setDescription("Please tell me a Duration for the Giveaway in Minutes, Seconds or Hours")
 gTime.addField("Example", "```10m - 10 Minutes```");

 titleEmbed.setTitle("Giveaway: Step 3")
 titleEmbed.setDescription("Please tell me a Title for the Giveaway")
 titleEmbed.addField("Example", "``Steam Giveaway``");

 presentEmbed.setTitle("Giveaway: Step 4")
 presentEmbed.setDescription("Please tell me What you are Giving away ")
 presentEmbed.addField("Example", "``Steam Code: {Code Here}``");


  if (message.author.bot) return;
//if(command === ' start') {
if(message.content.startsWith(prefix + " start")) {
// BELOW THIS LINE IS THE BOTS COMMANDS EDIT, REPLACE AND ADD TO THESE AS NEEDED IF YOU ARE WANTING TO EMBED THE COMMAND YOU CAN USE ONE OF THE BOTS PRE EXISTING COMMANDS AS A TEMPLATE
// MAKE SURE WHEN YOU ARE ADDING COMMANDS YOU FOLLOW THE PATH AND ROUTINE THAT I HAVE LISTED BELOW.
 // if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(perms);
    message.channel.send(chanEmbed).then(msg => {
     msg.delete(5000);
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send(noChan);
        room = collected.first().content;
        collected.first().delete();
        msg.channel.send(gTime).then(msg => {
         msg.delete(5000);
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**The Duration provided was not a valid Number**');
            duration = collected.first().content
            collected.first().delete();
            msg.channel.send(titleEmbed).then(msg => {
             msg.delete(5000);
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
          }).then(collected => {
            title = collected.first().content
            collected.first().delete();
            msg.channel.send(presentEmbed).then(msg => {
             msg.delete(5000);
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                present = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setDescription(`**${title}** \nReact With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  .setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find("name" , room).send(' :heavy_check_mark: **Giveaway Created** :heavy_check_mark:' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users
                       let list = users.array().filter(u => u.id || !== m.author.id || !== client.user.id);
                       if(!users) return message.channel.send("Couldn't determine a winner please try again")
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('Giveaway Ended !🎉',`Winners : ${gFilter} \nEnded at : ${hours}:${minutes}:${seconds} ${suffix}`)
                       .setTimestamp()
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});

                   let winEmbed = new Discord.RichEmbed()
                       winEmbed.setTitle("🎉 CONGRATULATIONS 🎉")
                       winEmbed.setDescription(`${gFilter} You won The \`${title}\` Giveaway`)
                       
                    let dmEmbed = new Discord.RichEmbed()
                        dmEmbed.setTitle("🎉 CONGRATULATIONS 🎉")
                        dmEmbed.setDescription(`You won The \`${title}\` Giveaway`)
                        dmEmbed.addField("Prize", "``" + `${present}` + "``")

                    message.guild.channels.find("name" , room).send(winEmbed)
                    gFilter.send(dmEmbed)
                  
                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **i Don't Have Permissions**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  });
})
};

client.on("message", (message) => {
 
// Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
if(message.content.startsWith(prefix + " invite")) {
const invite = new Discord.RichEmbed()
    invite.setTitle("🎉 Bot Invite 🎉")
    invite.setDescription("Invite me to your server here")
    invite.addField("Invite Link", "[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=653755293943201793&permissions=2147483127&scope=bot)")
  message.channel.send(invite);
  }

if(message.content.startsWith(prefix + " help")) {
const help = new Discord.RichEmbed()
    help.setTitle("🎉 Custom Giveaways 🎉")
    help.setDescription("Here is a list of my Commands")
    help.addField("-g help", "Shows this help message")
    help.addField("-g start", "Starts a Giveaway")
    help.addField("-g invite", "Generates a Invite link")
  message.channel.send(help);
  }
})

});

// THE CLIENT LOGIN PROCESS (BOT READS THE TOKEN FROM HERE)
// ADDITIONALLY YOU COULD ADD YOUR OWNERID INSTEAD 
client.login(process.env.BOT_TOKEN);
//////////////////////////////////////////////////////////////////////////////////////// COPYRIGHT INFORMATION DO NOT TOUCH THIS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////// Created By: Tyler. H#9393 | ツ The Watchers Bot Devs ツ /////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////// Support Server: https://discord.gg/Hg8jyzQ  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
