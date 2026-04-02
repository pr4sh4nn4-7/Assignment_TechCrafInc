
import 'dotenv/config'
import { sql } from './config/db.js'
import express from 'express'
import registerrouter from './routes/auth/register.js'
import loginrouter from './routes/auth/login.js'
import dashboardrouter from './routes/dashboard.routes.js'
import favoriterouter from './routes/favorites.routes.js'
import cors from 'cors'
const app = express()


/// user table
const TableCreation = async () => {
  try {
    await sql`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

`
    await sql` CREATE TABLE IF NOT EXISTS users(
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(25) NOT NULL,
email VARCHAR(66) UNIQUE Not NULL ,
password VARCHAR(222) NOT NULL

)


`

    await sql`CREATE TABLE IF NOT EXISTS favourites (
    id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id TEXT NOT NULL
  )`;

    console.log('users and favourites successfull')


  } catch (err) {
    console.log(err)

  }
}

TableCreation()





app.use(cors())
app.use(express.json({
  limit: '5mb'
}))
app.use('/api/v1/auth', registerrouter)
app.use('/api/v1/auth', loginrouter)
app.use('/api/v1/favorite', favoriterouter)
app.use('/api/v1/dashboard', dashboardrouter)

export default app
