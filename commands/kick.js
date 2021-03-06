module.exports = {
    name: "kick",
    description: "Kick User from Server",
    execute(msg, args, client) {
        if (msg.author.bot) return;
        if (!msg.guild) return;
        if (!msg.member.hasPermission("KICK_MEMBERS")) {
            msg.channel.send("You are missing the permission(s): Kick Members.");
        } else {
            let time = new Date();
            function amPm() {
                if (time.getHours() >= 11) {
                    return "PM";
                } else return "AM";
            }
            var testCont = msg.content.split(" ");
            var content = msg.content.split(" ").slice(2).join(" ");
            var kicked = msg.mentions.users.first();
            if (msg.mentions.users.size < 1) {
                msg.channel.send("You must provide a user to kick!");
            } else if (testCont.length <= 2) {
                msg.channel.send("Please provide a reason for the kick.");
            } else if (msg.guild.member(kicked).kickable) {
                client.users
                    .get(kicked)
                    .send(
                        `You have been kicked from ${msg.guild.name} for: ${content} by ${msg.author.username}`
                    );
                msg.guild
                    .member(kicked)
                    .kick()
                    .then((kicked) => {
                        var embed = new Discord.RichEmbed()
                            .setTitle("Kick")
                            .setDescription(`Kicked ${kicked.displayName}.`)
                            .setAuthor(
                                msg.author.username + "#" + msg.author.discriminator,
                                `${msg.author.avatarURL}`
                            )
                            .addField(
                                "Time",
                                `Kick occured at ${human.date(
                                    "m-d-y | h:i:s",
                                    new Date()
                                )} ${amPm()}`
                            )
                            .addField(
                                "Moderator",
                                `Kick administered by ${msg.author.username}#${msg.author.discriminator}`
                            )
                            .addField("Reason", `${content}`)
                            .setColor("#ff0000")
                            .setTimestamp();
                        msg.channel.send(embed);
                    });
            } else msg.channel.send("I am unable to kick that member.");
        }
    },
};
