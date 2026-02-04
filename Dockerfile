# --- Stage 1: Build Stage ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project (output usually goes to /app/dist)
RUN npm run build

# --- Stage 2: Production Stage ---
FROM nginx:stable-alpine

# Clean default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the 'build' stage
# Adjust '/app/dist' if your build output folder has a different name
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]