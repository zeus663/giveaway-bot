const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "tw/";
var token = "NTg1OTY2OTgxNTc2OTE3MDE0.XP9tkA.lWTXd7Cdbxelo0em1ocITblCHpQ";

client.on("ready", () => {
  console.log("ツ The Watchers ツ | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`tw/help In ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
});

client.on("guildCreate", (guild) => {
client.user.setGame(`tw/help In ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
const embed = new Discord.RichEmbed()
    .setTitle(`ツ Ticket Bot ツ`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm ツ Ticket Bot ツ!\nThanks for adding me to your guild!`)
    .addField(`Commands`, `[tw/help]() > Shows my help message and command usage`)
    .addField(`Ping`, `[tw/ping]() > Pings the bot and checks latency and response time`)
	 .addField(`Support Server`, `Join Our Discord: https://discord.gg/Hg8jyzQ`)
    guild.owner.user.send({ embed: embed });
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: ツ Ticket Bot ツ Help`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm ツ Ticket Bot ツ, the Discord bot for super cool support ticket stuff and more! Here are my commands:`)
    .addField(`Tickets`, `[tw/new]() > Opens up a new ticket and tags the Support Team\n[tw/close]() > Closes a ticket that has been resolved or been opened by accident`)
    .addField(`Other`, `[tw/help]() > Shows you this help menu your reading\n[tw/ping]() > Pings the bot to see how long it takes to react\n[tw/about]() > Tells you all about ツ The Watchers ツ`)
    message.channel.send({ embed: embed });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `about`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: ツ Ticket Bot ツ About`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm ツ Ticket Bot ツ, the Discord bot for super cool support tickets`)
    .addField(`Bot Owner/Developer`, `Tyler. H#9393`)
	.addField(`Support Server`, `https://discord.gg/Hg8jyzQ `)
	.addField(`Invite Me`, `https://discordapp.com/api/oauth2/authorize?client_id=585966981576917014&permissions=8&scope=bot`)
	.addField(`Server Count`, `${client.guilds.size} Servers`)
    message.channel.send({ embed: embed });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
    });
}

 if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
     if (!message.guild.channels.exists("name", "★★★★★★tickets★★★★★★", "category")) return message.channel.send("There wasn't a tickets category so i created one! Please execute the command again to open your ticket") .then(message.guild.createChannel("★★★★★★tickets★★★★★★", "category"))
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text",).then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        let category = message.guild.channels.find(c => c.name == "★★★★★★tickets★★★★★★" && c.type == "category");
        c.setParent(category);
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}

if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});

client.login(token);