import mysql, { Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  dateStrings: true,
});

const querySync = async <T>(
  query: string = '',
  replacements: T[] = [],
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<ResultSetHeader | RowDataPacket[] | unknown> => {
  const executeQuery = async (tries: number): Promise<ResultSetHeader | RowDataPacket[] | unknown> => {
    try {
      const result = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
            return;
          }

          connection.query(query, replacements, (error, results) => {
            connection.release();
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          });
        });
      });

      return result;
    } catch (error) {
      if (tries >= maxRetries) throw error;
      await new Promise((resolve) => {
        setTimeout(resolve, retryDelay);
      });
      return executeQuery(tries + 1);
    }
  };

  return executeQuery(1);
};

export default querySync;
