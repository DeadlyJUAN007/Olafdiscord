const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    //!review aantalSterren Tekst

    const amountStars = args[0];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! but you cant use this command.");

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Enter a number between 1 and 5 stars!");

    var text = args.splice(1, args.length).join(" ") || '**No text specified**';

    var channel = message.member.guild.channels.cache.get("739656259405480056");

    var date = moment(Date.now()).format("LLLL");

    if (!channel) return message.channel.send("This channel doesn't exist.");

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars += ":star: ";

    }

    message.delete();

    const embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} wrote a review.`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("#00ff6a")
        .addField("Stars: ", stars)
        .addField("Review: ", text)
        .setFooter(`Review written: ${date}`);
        // .setTimestamp();

    message.channel.send("✅ You have send your review!");

    return channel.send(embed);
}

module.exports.help = {
    name: "review",
    description: "Make a review about something with the amount of stars.",
    category: "Generaly",
    aliases: ["recensie"]
}

// Usage: **!review {amount of stars} {message}**