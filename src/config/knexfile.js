import dotenv from 'dotenv'
import { join } from 'path'

const __dirname = import.meta.dirname

dotenv.config()

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME
    },
    migrations: {
      directory: join(__dirname, 'src/database/migrations')
    },
    seeds: {
      directory: join(__dirname, 'src/database/seeds')
    }
  }
}
