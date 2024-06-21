import mssql from 'mssql'
import { sqlConfiguration } from '../config/configure.database'

export class Helper {


  static async execute(procedure: string, data: { [c: string | number]: string }) {

    let pool = mssql.connect(sqlConfiguration) as Promise<mssql.ConnectionPool>

    let request = ((await pool).request()) as mssql.Request;

    for (let key in data) {
      request.input(key, data[key])
    }

    const result = await request.execute(procedure);

    return result;

  }
}