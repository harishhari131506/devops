# Step 1: Use an official Node.js runtime as the base image
FROM node:20

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm ci --no-cache

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port that your app will run on
EXPOSE 3000

# Step 7: Define the command to run your app
CMD sleep 10 && node server.js
