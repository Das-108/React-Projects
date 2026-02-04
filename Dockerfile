# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files from the subfolder
COPY Color-Palate-Generator/package*.json ./
RUN npm install

# Copy the entire subfolder content
COPY Color-Palate-Generator/ .
RUN npm run build

# --- Stage 2: Serve ---
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy from the build stage (Vite builds to 'dist' by default)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]