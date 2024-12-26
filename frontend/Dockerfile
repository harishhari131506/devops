
# Step 1: Build the Angular app
FROM node:18-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --no-cache

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build --prod --verbose

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine AS production-stage

# Copy the build output from the previous stage to Nginx's public folder
COPY --from=build-stage /app/dist/browser /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Nginx will automatically serve the app
CMD ["nginx", "-g", "daemon off;"]
