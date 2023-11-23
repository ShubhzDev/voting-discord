const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "query",
        description: "Queries Total Vote Casted",
    },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}