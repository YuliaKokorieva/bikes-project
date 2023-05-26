const sql = require('mssql');
const getRides = require('../index'); 

jest.mock('mssql');

describe('Azure Function', () => {
  let context;

  beforeEach(() => {
    context = {
      res: {},
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return data from the database', async () => {
    const mockResult = {
      recordset: [
        {
          ID: 1,
          Departure_station: 'Station A',
          Return_station: 'Station B',
          Duration_sec: 300,
          Covered_distance_m: 500,
        },
        {
          ID: 2,
          Departure_station: 'Station C',
          Return_station: 'Station D',
          Duration_sec: 600,
          Covered_distance_m: 1000,
        },
      ],
    };

    sql.query.mockResolvedValue(mockResult);

    await getRides(context);
  
    expect(context.res.body).toEqual(mockResult.recordset); 
  });

  it('should handle database errors', async () => {
    const errorMessage = 'Database connection error';
    sql.connect.mockRejectedValue(new Error(errorMessage));

    await getRides(context);

    expect(context.res).toEqual({
      status: 500,
      body: 'Error retrieving data from database: Error: ' + errorMessage,
    });
  });
});
