# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files from the subfolder
COPY Gallery-Project/package*.json ./
RUN npm install

# Copy the entire subfolder content
COPY Gallery-Project/ .
RUN npm run build

# --- Stage 2: Serve ---
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx (Vite usually outputs to 'dist')
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]