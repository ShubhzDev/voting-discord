#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Go up two directories to reach the common parent directory
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

# Array of directories where you want to run npm start
FRONTEND_BOT_DIR=("$PARENT_DIR/frontend")

# Check if the directory exists
if [ -d "$FRONTEND_BOT_DIR" ]; then
    echo "Starting npm in discord-bot directory..."
    cd "$FRONTEND_BOT_DIR" || exit 1 # Change directory or exit if it fails
    npm install
    npm start
else
    echo "discord-bot directory does not exist."
fi
