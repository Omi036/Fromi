# Dockerizing
Fromi comes with a prepared dockerfile and docker-compose file with mysql integration by default.  
For dockerizing with compose:
```bash
npm run dockerize
```
It will grab the .env file by default, although env variables can also be specified (and overriden) on the `docker-compose.yml` file:

```{code-block} yaml
:caption: docker-compose.yml
services:
  app:
    build: .
    container_name: fromi
    ports:
      - "3000:3000" # May be changed according to the .env file
    env_file:
      - .env
    environment:
      DB_HOST: mysql
    depends_on:
      - mysql
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    container_name: fromi_db
    environment:
      MYSQL_ROOT_PASSWORD: a_safe_password # Change the root password!!
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```
And the dockerfile being:
```{code-block} dockerfile
:caption: dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```