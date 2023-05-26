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
      SELECT ID, [Departure_station_name] as Departure_station, [Return_station_name] as Return_station, [Duration_sec], [Covered_distance_m]
      FROM [dbo].[Rides_10000];
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
