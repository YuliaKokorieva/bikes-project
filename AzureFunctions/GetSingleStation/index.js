const sql = require('mssql');

module.exports = async function (context, req) {
  try {
    const config = {
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER, 
      database: process.env.DB_NAME, 
      authentication: {
        type: 'default'
      },
      options: {
        encrypt: true
      }
    }

    await sql.connect(config);

    const result = await sql.query(`
        SELECT rides.ID as "Ride ID", rides.Departure_station_id, dep_stations.Name as "Departure_station", rides.Return_station_id
        FROM [dbo].[Rides] as rides 
        JOIN [dbo].[Bike_stations] as dep_stations 
        ON rides.Departure_station_id = dep_stations.id
        WHERE dep_stations.id = ${req.query.id};
    `);

    context.res = {
      body: result.recordset
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: "Error retrieving data from database: " + err
    };
  } finally {
    await sql.close();
  }
};
