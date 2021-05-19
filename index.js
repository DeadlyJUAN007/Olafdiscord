const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const database = require("./database.json");
const mysql = require("mysql");
const levelFile = require("./data/levels.json");
const moment = require("moment")

const activeSongs = new Map();

const fs = require("fs");
const { TIMEOUT } = require("dns");

const client = new discord.Client();

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

client.login(process.env.token);

var con = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database
});

// con.connect(err => {
//     if (err) throw err;
// });


fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("No files found.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} has been loaded`);

        client.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach(alias => {
            client.aliases.set(alias, fileGet.help.name);
        })
    })

});

client.on("guildMemberAdd", member => {

    // var role = member.guild.roles.cache.get("568449415052787714");

    // if (!role) return;

    // member.roles.add(role);


    con.query(`SELECT IDRole FROM rollen WHERE IDUser = '${member.user.id}'`, (err, rows) => {

        if (err) throw err;

        if (rows.length > 0) {

            for (let index = 0; index < rows.length; index++) {
                const role = rows[index];

                member.roles.add(role.IDRole);

            }



        }


    });

    var channel = member.guild.channels.cache.get('729753515253039205');

    var joined = moment(member.joinedAt).format("LLLL");

    if (!channel) return;

    // channel.send(`Welcome to the server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription(`**Hello ${member.user.username}, Welcome on the ${member.guild.name} server**`)
        .setColor("#00ff00")
        .setFooter(`User joined at: ${joined}.`);

    channel.send(joinEmbed);
})

client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('729753515253039205');

    var leaved = moment(member.leftAt).format("LLLL");

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription(`**Bye ${member.user.username}, he left the ${member.guild.name} server**`)
        .setColor("#ff0000")
        .setFooter(`User left at: ${leaved}`);

    channel.send(leaveEmbed);
})

client.on("ready", async () => {

    console.log(`${client.user.username} is online`);
    client.user.setActivity("!help", { type: "PLAYING" });   // { type: "PLAYING" }
});

// var swearWords = ["kanker", "kkr", "gay", "fucking", "fuck", "homo", "neger", "tyfus", "tering", "kankerhoer", "kankerhond", "kankerlijer", "neuk", "klootzak", "kloothommel", "kloot" ];

client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "No text found";

    var response = `Message ${messageDeleted.id} has been deleted in ${messageDeleted.channel}\n **Message:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.tag} (${messageDeleted.author.id})`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(response)
        .setTimestamp()
        .setColor("#FF0000")

    client.channels.cache.find(c => c.name == "📕-log").send(embed);

});


client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefix: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefix;


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLowerCase();

    for (let i = 0; i < swearWords["swearWords"].length; i++) {

        if (msg.includes(swearWords["swearWords"][i])) {

            message.delete();

            return message.reply("No swearing please!").then(msg => msg.delete({ timeout: 3000 }));
        }

    }


    // var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    // var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    // var sentenceUser = "";
    // var amountSwearWords = 0;

    // for (let y = 0; y < messageArray.length; y++) {

    //     const word = messageArray[y].toLowerCase();

    //     var changeWord = "";

    //     for (let i = 0; i < swearWords["swearWords"].length; i++) {

    //         if (word.includes(swearWords["swearWords"][i])) {

    //             changeWord = word.replace(swearWords["swearWords"][i], "******");

    //             sentenceUser += " " + changeWord;

    //             amountSwearWords++;

    //         }

    //     }

    //     if (!changeWord){
    //         sentenceUser+= " " + messageArray[y];

    //     }

    // }

    // if(amountSwearWords != 0){

    //     message.delete();
    //     message.channel.send(sentenceUser);
    //     message.channel.send("Dont swear please.").then(msg => msg.delete({timeout: 3000}));


    // }


    var command = messageArray[0];

    RandomXp(message);

    if (!message.content.startsWith(prefix)) return;

    //  command handler

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, options);


    // if (command === `${prefix}clientinfo`) {

    //     var clientEmbed = new discord.MessageEmbed()
    //         .setTitle("bot Info")
    //         .setDescription("An info card that provides information about the bot")
    //         .setColor("#0088ff")
    //         .addFields(
    //             { name: "Owner:", value: "Alex" }
    //         )
    //         .addField("bot name:", bot.user.username)
    //         .setThumbnail("https://bit.ly/3eAPedG")
    //         .setFooter("that was all of the info", "https://bit.ly/3eAPedG")
    //         .setTimestamp();

    //     return message.channel.send(clientEmbed);
    // }

    async function promptMessage(message, author, time, reactions) {

        time *= 1000;

        for (const reaction of reactions) {
            await message.react(reaction);
        }

        var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
    }
})

function RandomXp(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;

    // console.log(randomNumber)

    var idUser = message.author.id;

    if (!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var nextLevelXp = levelUser * 300;

    if (nextLevelXp == 0) nextLevelXp = 100;

    if (xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
            if (err) console.log(err);
        });

        if (levelFile[idUser].level == 5) {

            var role = message.guild.roles.cache.find(r => r.name === "Gast");
            
            var member = message.member;
            member.roles.add(role);

            var embedLevel = new discord.MessageEmbed()
                .setDescription(`***Level Up + Rank Up! ⏫***`)
                .setColor("#00FF00")
                .addField("New Rang: ", "Gast")
                .addField("New level: ", levelFile[idUser].level);
            message.channel.send(embedLevel);

        } else {
            var embedLevel = new discord.MessageEmbed()
                .setDescription("***Level up! ⏫***")
                .setColor("#00FF00")
                .addField("New level:", levelFile[idUser].level);
            message.channel.send(embedLevel);

        }


    }

        // fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
        //     if (err) console.log(err);
        // });

}