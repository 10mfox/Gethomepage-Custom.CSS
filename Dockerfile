FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --no-progress

# Copy source files
COPY . .

# Update permissions for node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# The port will be provided via environment variable
ENV PORT=5173
EXPOSE ${PORT}

# Start the development server with minimal output using JSON format
CMD ["sh", "-c", "printf \"CSS Editor Ready at http://localhost:$PORT\n\" && exec npm run dev -- --host 0.0.0.0 --port $PORT > /dev/null 2>&1"]