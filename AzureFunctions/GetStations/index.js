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
      SELECT ID, Name, Adress, Kaupunki, x, y
      FROM [dbo].[Bike_stations]
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
