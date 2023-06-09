# Bike Rides project
Fullstack / Cloud project for storing and displaying data on city bike rides in Helsinki.  

### Data:
Concatenated and validated with [Python script](https://github.com/YuliaKokorieva/bikes-project/blob/master/Data/data_validation.py). 
Validation included:
1. removing the rides with missing values
2. removing the rides that lasted less than 10 secs and less then 10 m
3. removing the rides, where Departure or Return station is not among the stations in the list of Bike stations

For importing and manipulating data in the Azure SQL Database, Azure Data Studio tool has been used.

### Backend:  
Hosted in Azure:

 - Azure SQL Database
 - Azure Functions (code and instructions stored [here](https://github.com/YuliaKokorieva/bikes-project/tree/master/AzureFunctions))

### Frontend:   
Written with React using external libraries.  
Deployed to Azure Web Apps via Github Actions CI/CD pipeline.  
Code (and detailed instructions) stored [here](https://github.com/YuliaKokorieva/bikes-project/tree/master/BikeRidesFront).
