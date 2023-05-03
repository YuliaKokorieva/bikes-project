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
      SELECT rides.ID, rides.[Departure], rides.[Return], rides.[Covered_distance_m], rides.[Duration_sec], dep_stations.[Nimi] as Departure_station, ret_stations.[Nimi] as Return_station
      FROM [dbo].[Rides] as rides 
      JOIN [dbo].[Bike_stations] as dep_stations 
      ON [rides].[Departure_station_id] = [dep_stations].[ID] 
      JOIN [dbo].[Bike_stations] as ret_stations 
      ON [rides].[Return_station_id] = [ret_stations].[ID]
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
