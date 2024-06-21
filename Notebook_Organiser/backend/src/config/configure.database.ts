import mssql from 'mssql';
import dotenv from 'dotenv'

dotenv.config();

export const sqlConfiguration = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.MY_SERVER_NAME as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  
  let pool = await mssql.connect(sqlConfiguration)

  if (pool.connected) {
    console.log("Connection to the database was a success");
    
  }

  else {
    console.log("Error, connecting to the database");
    
  }

}

testConnection();