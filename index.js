require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const Levels = require("discord-xp");
Levels.setURL(process.env.mongoPath);
Object.keys(botCommands).map((key) => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (msg) => {
    if (msg.content.split("")[0] == ".") {
        const args = msg.content.substring(1).split(/ +/);
        const command = args[0].toLowerCase();
        console.info(`Called command: ${command}`);
        if (!bot.commands.has(command)) return;
        try {
            bot.commands.get(command).execute(msg, args, bot);
        } catch (error) {
            console.error(error);
            msg.reply("there was an error trying to execute that command!");
        }
    }
    if (!msg.guild) return;
    if (msg.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(msg.author.id, msg.guild.id);
        msg.channel.send(
            `${msg.author}, congratulations! You have leveled up to **${user.level}**. :tada:`
        );
    }
});
