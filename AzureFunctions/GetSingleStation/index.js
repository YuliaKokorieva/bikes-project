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
    AVG(CASE WHEN r2.Return_station_id = s.id THEN r2.Covered_distance_m END) AS avg_distance_ended,
    (
      SELECT STRING_AGG(b1.name, ', ')
      FROM (
        SELECT TOP 5 b.name
        FROM Rides_10000 r1
        JOIN Bike_stations b ON r1.Return_station_id = b.id
        WHERE r1.Departure_station_id = s.id
        GROUP BY b.name
        ORDER BY COUNT(*) DESC
      ) AS b1
    ) AS top_return_stations,
    (
      SELECT STRING_AGG(b2.name, ', ')
      FROM (
        SELECT TOP 5 b.name
        FROM Rides_10000 r2
        JOIN Bike_stations b ON r2.Departure_station_id = b.id
        WHERE r2.Return_station_id = s.id
        GROUP BY b.name
        ORDER BY COUNT(*) DESC
      ) AS b2
    ) AS top_departure_stations
  FROM 
    Bike_stations s 
    LEFT JOIN Rides_10000 r1 ON s.id = r1.Departure_station_id 
    LEFT JOIN Rides_10000 r2 ON s.id = r2.Return_station_id 
  WHERE 
  s.id = ${req.query.id}
  GROUP BY 
    s.id, s.name, s.x, s.y, s.Osoite, s.Kaupunki;
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
