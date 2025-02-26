# Build stage: Use a lightweight Node.js image
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json separately to cache dependencies
COPY package*.json ./

# Install dependencies using clean npm ci (faster & deterministic)
RUN npm ci --production

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Production stage: Use an optimized Nginx image
FROM nginx:1.25-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built frontend files from the build stage
COPY --from=build /app/dist .

# Ensure Nginx serves correct content
RUN chown -R nginx:nginx /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
