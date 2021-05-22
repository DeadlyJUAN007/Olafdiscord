const database = require("../database.json");
const mysql = require("mysql");

module.exports.run = async (client, message, args) => {

    var con = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database
    });

    con.connect(err => {
        if (err) message.channel.send("Something went wrong.");
    });

    // !role gebruiker rolNaam verwijderenBool

    var user = message.guild.member(message.mentions.users.first());
    var roleName = args[1];
    var remove = args[2];

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry! But you can't use this command");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");

    if (roleName) {
        var roleInfo = message.guild.roles.cache.find(r => r.name === roleName);
        if (!roleInfo) return message.channel.send("That role doesn't exist");
        var roleID = roleInfo.id;
    }

    if (user && !roleName) {

        con.query(`SELECT IDRole FROM rollen WHERE IDUser = '${user.id}'`, (err, rows) => {

            if (err) throw err;

            if (rows.length > 0) {

                var listRoles = "**Role(s) of this member: ** \n";

                for (let index = 0; index < rows.length; index++) {
                    const role = rows[index];

                    var roleNameList = message.guild.roles.cache.get(role.IDRole).name;

                    listRoles += `- ${roleNameList} \n`;
                }

                return message.channel.send(listRoles);

            } else {
                return message.channel.send("This user has no roles.");
            }

        });


    } else if (user && roleName && !remove) {

        con.query(`SELECT * FROM rollen WHERE IDUser = '${user.id}' AND IDRole = '${roleID}'`, (err, rows) => {

            if (err) throw err;

            if (rows.length > 0) {
                return message.channel.send("This user already has that role");
            } else {
                con.query(`INSERT INTO rollen (IDUser, IDRole) VALUES ("${user.id}","${roleID}")`);
                user.roles.add(roleID);
                return message.channel.send("Role has been added.");
            }

        })

    } else if (user && roleName && remove == "yes") {


        con.query(`DELETE FROM rollen WHERE IDUser = '${user.id}' AND IDRole = '${roleID}'`, (err, rows) => {

            if (err) throw err;

            if (rows.affectedRows == 1) {

                user.roles.remove(roleID);
                return message.channel.send(`Role ${roleName} has been removed.`);

            } else {
                return message.channel.send("Role has already been removed.");
            }

        });


    } else {
        message.channel.send("Usage: !role @username rolename remove");
    }


}

module.exports.help = {
    name: "role",
    description: "Give/take roles from members.",
    category: "Moderation",
    aliases: ["rollen"]
}

// Usage: **!role {@username} {rolename} <yes>**