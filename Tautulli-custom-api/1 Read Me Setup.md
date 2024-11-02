# Custom API For Tautulli Setup Guide

![Homelab-11-02-2024_01_24_PM](https://github.com/user-attachments/assets/a7e8f944-a4fd-4f1a-b605-72465bced4cb)


## File Structure
First, create the following file structure:
```
your-project/
├── api/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── .env
└── docker-compose.yaml
```

## Setup Steps

### 1. Create the API Directory
```bash
mkdir api
cd api
```

### 2. Initialize Node.js Project
Create a new Node.js project and install dependencies:
```bash
npm init -y
npm install express axios
```

### 3. Environment Variables
Create a `.env` file in your project root with the following variables:
```env
TAUTULLI_API_PORT=3008  # if port 3008 is being used change to an available port of your choice api will then use that port 
TAUTULLI_BASE_URL=http://your-local-ip:8181/api/v2  # and change port number 8181 if thats not what yours is
TAUTULLI_API_KEY=your_api_key_here
```

### 4. Docker Compose Configuration
Add this service to your existing `docker-compose.yaml` or create a new one:
```yaml
services:
  api:
    container_name: Api  
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "${TAUTULLI_API_PORT}:${TAUTULLI_API_PORT}"
    env_file:
      - .env 
    volumes:
      - ./api:/app
      - /app/node_modules
    restart: always
    network_mode: bridge
```

### 5. Create Files
Place the provided files in their respective locations:
- `server.js` → `api/server.js`
- `Dockerfile` → `api/Dockerfile`
- `package.json` → `api/package.json`

### 6. Start the Service
Run the following commands from your project root:
```bash
# Build and start the service
docker-compose up -d

# View logs
docker-compose logs -f api
```

## Available Endpoints
Once running, the following endpoints will be available:   if you changed the port in .env use that port in the endpoint
### Use local-Ip not (localhost)
- `http://localhost:3008/api/recent/shows` - TV Shows content
- `http://localhost:3008/api/recent/movies` - Movie content
- `http://localhost:3008/api/recent/all` - Combined content

### Query Parameters
- `count` - Number of items to return (optional, defaults to 20)
Example: `http://localhost:3008/api/recent/shows?count=10`

## Troubleshooting
1. If the service fails to start, check the logs:
   ```bash
   docker-compose logs api
   ```
2. Ensure all environment variables are properly set in your `.env` file
3. Make sure ports are not already in use on your host machine
4. Verify network connectivity to your Tautulli instance

## Development
For local development without Docker:
```bash
cd api
npm install
node server.js
```

# services.yaml

```- Recently Added:
     - Movies:
        icon: mdi-filmstrip
        id: list
        widget:
          type: customapi
          url: http://{{HOMEPAGE_VAR_LOCAL_IP}}:3008/api/recent/movies
          method: GET
          display: list
          mappings:
            - field:
                response:
                  data:
                    recently_added:
                      0: title
              additionalField:
                field:
                  response:
                    data:
                      recently_added:
                        0: year
                color: theme
            - field:
                response:
                  data:
                    recently_added:
                      1: title
              color: theme
              additionalField:
                field:
                  response:
                    data:
                      recently_added:
                        1: year
                color: theme
            - field:
                response:
                  data:
                    recently_added:
                      2: title
              additionalField:
                field:
                  response:
                    data:
                      recently_added:
                        2: year
                color: theme
            - field:
                response:
                  data:
                    recently_added:
                      3: title
              additionalField:
                field:
                  response:
                    data:
                      recently_added:
                        3: year
                color: theme
            - field:
                response:
                  data:
                    recently_added:
                      4: title
              additionalField:
                field:
                  response:
                    data:
                      recently_added:
                        4: year
                color: theme               
     - Shows:
         icon: mdi-television-classic
         id: list
         widget:
           type: customapi
           url: http://{{HOMEPAGE_VAR_LOCAL_IP}}:3008/api/recent/shows
           method: GET
           display: list
           mappings:
              - field:
                  response:
                    data:
                      recently_added:
                        0: grandparent_title
                additionalField:
                  field:
                    response:
                      data:
                        recently_added:
                          0: combined_title
                  color: theme
              - field:
                  response:
                    data:
                      recently_added:
                        1: grandparent_title
                additionalField:
                  field:
                    response:
                      data:
                        recently_added:
                          1: combined_title
                  color: theme
              - field:
                  response:
                    data:
                      recently_added:
                        2: grandparent_title
                additionalField:
                  field:
                    response:
                      data:
                        recently_added:
                          2: combined_title
                  color: theme
              - field:
                  response:
                    data:
                      recently_added:
                        3: grandparent_title
                additionalField:
                  field:
                    response:
                      data:
                        recently_added:
                          3: combined_title
                  color: theme
              - field:
                  response:
                    data:
                      recently_added:
                        4: grandparent_title
                additionalField:
                  field:
                    response:
                      data:
                        recently_added:
                          4: combined_title
                  color: theme```
