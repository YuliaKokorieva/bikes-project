## Description

This is backend for the Bike Rides application. It provides the data on bike rides and on bike stations.
The app uses the Azure SQL database.
It can be run either locally or from the Azure cloud (Function App).

#### Available Functions:
1.  **GetRides**: returns all rides. Example response: 
`[{ "ID": 1,
    "Departure_station": "Laajalahden aukio",
    "Return_station": "Teljäntie",
    "Duration_sec": 500,
    "Covered_distance_m": 2043
  },
  ...
  ]`
  
2. **GetStations**: returns all stations. Example response:
  `[
  {
    "ID": 1,
    "Name": "Kaivopuisto",
    "Osoite": "Meritori 1",
    "Kaupunki": null
    }, ...]`

3. **GetSingleStation**: returns info on selected station; requires **id** as parameter (http://localhost:7071/api/GetSingleStation?id=6). Example response:
`{
  "station_id": 6,
  "station_name": "Hietalahdentori",
  "station_lng": 24.9296476311878,
  "station_lat": 60.1622283898112,
  "Osoite": "Hietalahdenkatu 2",
  "Kaupunki": null,
  "rides_originated": 81,
  "rides_ended": 78,
  "avg_distance_originated": 2023.6666666666667,
  "avg_distance_ended": 2170.1153846153848,
  "top_return_stations": "Itämerentori, Erottajan aukio, Tyynenmerenkatu, Kaivopuisto, Kapteeninpuistikko",
  "top_departure_stations": "Itämerentori, Kamppi (M), Tyynenmerenkatu, Annankatu, Hernesaarenranta"
}`

## 1. Running locally
#### Preparation
1. install Azure Functions Core Tools: `npm install -g azure-functions-core-tools` 

#### Installation

1. clone the repo
2. open AzureFunctions folder
3. run `npm install`
4. to run Functions locally, you need credentials for DB connection, that are stored in `local.settings.json` file. It can be sent via email and should be placed in the root directory.

#### Starting backend server locally
1. in project root folder terminal, run `func start` before starting the Frontend.

#### Running tests
As an example, for GetRides function the unit tests utilizing Jest library are implemented. 
To run the test, open the terminal to any folder within AzureFunctions project and run `npm run test` command.


## 2. Running from the cloud
You do not need to do anything to start the server from the cloud. 
The [Frontend](https://github.com/YuliaKokorieva/bikes-project/tree/master/BikeRidesFront) for the app uses Cloud backend by default, but it may take a couple of minutes for the FunctionApp to launch.
