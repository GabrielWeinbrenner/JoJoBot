module.exports = {
    name: "ping",
    description: "Ping!",
    execute(msg, args, client) {
        msg.reply("pong");
    },
};
