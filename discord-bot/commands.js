//Due to lack of time couldn't complete this

const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "query",
        description: "Queries Total Vote Casted",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_ID);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

