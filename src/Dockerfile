   # Use an official Node runtime as a parent image
   FROM node:20-slim

   # Set the working directory
   WORKDIR /action

   # Install clever-tools
   RUN npm install -g clever-tools

   # Copy the rest of your action's code
   COPY . .

   # Run the action
   CMD ["node", "/usr/src/app/src/main.ts"]
