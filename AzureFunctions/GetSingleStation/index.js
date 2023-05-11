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
    SELECT 
      s.id AS station_id, 
      s.name AS station_name, 
      s.x AS station_lng,
      s.y AS station_lat,
      s.Osoite,
      s.Kaupunki,
      COUNT(DISTINCT r1.id) AS rides_originated, 
      COUNT(DISTINCT r2.id) AS rides_ended,
      AVG(CASE WHEN r1.Departure_station_id = s.id THEN r1.Covered_distance_m END) AS avg_distance_originated,
      AVG(CASE WHEN r2.Return_station_id = s.id THEN r2.Covered_distance_m END) AS avg_distance_ended
    FROM 
      Bike_stations s 
      LEFT JOIN Rides r1 ON s.id = r1.Departure_station_id 
      LEFT JOIN Rides r2 ON s.id = r2.Return_station_id 
    WHERE 
      s.id = ${req.query.id}
    GROUP BY 
      s.id, s.Name, s.x, s.y, s.Osoite, s.Kaupunki;

    `);
    if (result.recordset.length > 0) {
      context.res = {
        body: result.recordset[0]
      };
    } else {
      context.res = {
        status: 404,
        body: "No data found"
      };
    }

  } catch (err) {
    context.res = {
      status: 500,
      body: "Error retrieving data from database: " + err
    };
  } finally {
    await sql.close();
  }
};
