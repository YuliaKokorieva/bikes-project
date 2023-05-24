## Description

This is frontend for the Bike Rides application. 
Available features:
* list of all rides for the period ...
* list of all bike stations
* info on every station

## Installation
1. clone the repo
2. open BikeRidesFront folder
3. run `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app with the Azure Functions backend running from the cloud. Might take a minute or two for the backend to launch upon request.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm start local`

Runs the app with the Azure Functions backend running locally (requires to previously turn on the backend, instructions in [AzureFunctions](https://github.com/YuliaKokorieva/bikes-project/tree/master/AzureFunctions) ).
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Setting up SonarQube and running static code analysis
SonarQube is an open source platform to perform automatic reviews with static analysis of code to detect bugs, code smells and security vulnerabilities on 25+ programming languages. 
In this app, the possibility to run static code analysis is implemented. To perform this, follow these steps:

1. make sure you have docker installed. Open Docker Desktop
2. open the terminal to the project root folder and run `docker compose up`
3. when you see the text "SonarQube is operational" in the logs, go to `http://localhost:9000`. Default user name and password are `admin`, `admin`; as required, change the password in order to login. 
4. having logged in, go to ` Administration -> Security -> Users ` and generate new token
5. go to project root, rename file `.env.example` to `.env` and copy the token to the variable definition
6. now all set, the first analysis can be performed by opening the terminal to the project root folder and running command `node sonarqube-scanner.js` 
7. when the text "EXECUTION SUCCESS" appears in the logs, you can go to `http://localhost:9000/projects`  and check the results.  

(for sake of simplicity, the default SonarQube container with H2 is used. However, if you want to persistently save analysis reports, it is recommended to use the SonarQube container with a Postgresql database)

## Tests 

