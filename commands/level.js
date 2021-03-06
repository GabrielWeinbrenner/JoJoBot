const Levels = require("discord-xp");

module.exports = {
    name: "level",
    description: "Receive Your Level",
    async execute(msg, args, client) {
        console.log(client);
        if (args[1] == "leaderboard") {
            const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 5);

            if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

            const lb = leaderboard.map(
                (e) =>
                    `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
                        e.level
                    }\nXP: ${e.xp.toLocaleString()}`
            );
            msg.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
        } else if (args[1] == "rank") {
            const target = msg.mentions.users.first() || msg.author;

            const user = await Levels.fetch(target.id, msg.guild.id);

            if (!user)
                return msg.channel.send("Seems like this user has not earned any xp so far.");

            msg.channel.send(
                `> **${target.tag}** is currently level ${user.level} with ${user.xp}xp.`
            );
        }
    },
};
