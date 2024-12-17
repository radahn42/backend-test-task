import knex from 'knex'
import dotenv from 'dotenv'
import config from '../config/knexfile.js'

dotenv.config()

const db = knex({
  ...config.development
})

export default db
