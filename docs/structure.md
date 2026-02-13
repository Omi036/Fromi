# Project Structure
The project structure is the following:
```
.
├── logs/
├── dist/
├── src/
│   ├── lib/
│   ├── managers/
│   ├── models/
│   ├── routes/
│   └── app.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
├── .dockerignore
├── dockerfile
├── docker-compose.yml
├── LICENSE
└── ...
```
## `logs/`
Contains all the logs file from LoggerManager, used for debugging.  

## `dist/`
As the project is using typescript, this folder contains the compiled Javascript and executable version of your code.  

## `src/`
This is where the magic happens.  
All the code is contained here and only inside this folder.  

## `.env`
This is your secret environment variables file. Here you can safely place any variables or sensitive tokens and will not be exposed. That said, do not ever leak this file.  
By default, a template of this file is provided, with the following structure:  
```{code-block} env
:caption: /.env/
DB_DRIVER="mysql"
DB_HOST="0.0.0.0"
DB_USER="user"
DB_PASSWORD="password"
DB_DATABASE="database"

DISCORD_TOKEN="1234..."
DISCORD_CLIENT_ID="1234..."

JWT_EXPIRES=3600
JWT_SECRET="a-string-secret-at-least-256-bits-long"
```

## `.gitignore`
Contains the files and folders that should not be sent to github nor other repos. You may want to take a look if planning on uploading your project to a repo, otherwise, don't mind it.

## `package.json/tsconfig.json/`  
Contains information about your project and dependencies. You may want to change some values to adjust it to your project information. It also contains project scripts such as `npm run start`.  

## `jest.config.js`
Contains information about `jest` test cases.

## `LICENSE`  
This file is very important, it tells what you can and cannot do with the code. In our case, Fromi is developed under MIT, which means you can do basically anything you want **EXCEPT for modifying or deleting the default LICENSE**. You can add other licenses on top however.

## `.dockerignore/dockerfile/docker-compose.yml`
Contains data for dockerization with a mysql db. If you are planning in dockerize, you already know what those files are ;)

## `src/lib/`
Contains minimal utils that may be useful to you, common for everyone.  
However, it is not recommended changing these files, as managers may require these.

## `src/managers/`
Contains all the managers. You can add nor update any manager you need.

## `src/models/`
This folder is optional.  
It may be useful for containing models for your framework, such as Users or other data.

## `src/routes/`
This folder is optional.
It may be useful for containing routes for your services, like for API's, WebSockets, Commands or similar.

## `src/app.ts`
This is the default entry point for your application. Everything you code here, will be executed mainly.