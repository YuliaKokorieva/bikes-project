# Bike Rides project
**Data** concatenated and validated with [Python script](https://github.com/YuliaKokorieva/bikes-project/blob/master/Data/data_validation.py). 
Validation included:
1. removing the rides with missing values
2. removing the rides that lasted less than 10 secs and less then 10 m
3. removing the rides, where Departure or Return station is not among the stations in the list of Bike stations

For importing and manipulating data in the Azure SQL Database, Azure Data Studio tool has been used.


**Backend** hosted in Azure:

 - Azure SQL Database
 - Azure Functions (code and instructions stored [here](https://github.com/YuliaKokorieva/bikes-project/tree/master/AzureFunctions))

**Frontend** written with React using external libraries.
Code (and detailed instructions) stored [here](https://github.com/YuliaKokorieva/bikes-project/tree/master/BikeRidesFront).

###Comments on my pre-assignment

Working on the pre-assignment was a fascinating experience for me. It provided an opportunity to further enhance my skills in React and, for the first time in my projects, implement the backend on the cloud using Azure Functions. However, there are two areas that have room for further development:

1. One key realization from this assignment was the need to dedicate more time to learning **various aspects of testing**. I understand the importance of honing my skills in this area and will invest the necessary time to improve.

2. **Managing large datasets** within React proved to be a challenge for me, and as a result, I had to limit the Rides dataset to just 10,000 rows to complete the exercise. This limitation was due to time constraints and the lack of an adequate solution. Recognizing this weakness, I am determined to find more efficient approaches for handling substantial datasets in the future.

Although I faced certain circumstances that limited my ability to dedicate sufficient time to these two issues, I am grateful for this exercise as it highlighted areas for improvement. I am committed to addressing these weaknesses and investing the necessary effort to strengthen my skills.
