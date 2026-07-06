# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build the Express backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copy the built React app from Stage 1 to the backend's public folder
COPY --from=frontend-builder /app/dist ./public

EXPOSE 3001
CMD ["node", "server.js"]
