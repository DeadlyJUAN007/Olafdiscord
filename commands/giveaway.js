const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //!giveaway aantalSpeler tijd berichtjeTekst

    var item = "";
    var time;
    var winnerCount;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! But you can't use this command.");

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(" ");

    if (!winnerCount) return message.reply("No amount of winners given!");
    if (!time) return message.reply("No giveaway time given!");
    if (!item) return message.reply("No item given!");

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setColor("#00ffe1")
        .setFooter(`Expires: ${dateEnd}`)
        .addFields(
            { name: "Hosted By:", value: `${message.author}` },
            { name: "Max winners:", value: winnerCount }
        )
        .setDescription(`The giveaway item is **${item}**.\n\n Enter by pressing 🎉.`);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i].id == client.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }

        }

        if (peopleReacted.length == 0) {
            return message.channel.send("Nobody has won so the bot wins!");
        }

        if (peopleReacted.length < winnerCount) {
            return message.channel.send("There are too few people who participated, so the bot won!")
        }

        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if (winners[o] == peopleReacted[random]) {
                    inList = true;
                    y--;
                    break;
                }

            }

            if (!inList) {
                winners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < winners.length; y++) {

            message.channel.send("Congratulations: " + "<@" + winners[y].id + ">" + ` You have won **${item}**.`);

        }

    }, time * 1000)

}

module.exports.help = {
    name: "giveaway",
    description: "Create a giveaway.",
    category: "Moderation",
    aliases: ["geef_weg"]
}

// Usage: **!giveaway {amount of winners} {time} {Item}**