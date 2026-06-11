import mongoose from 'mongoose'
import { DB_URI, DB_NAME } from '../config/config.services.js'
export async function checkDataBaseConnection() {
  await mongoose
    .connect(`${DB_URI}`)
    .then(() => {
      console.log('connected to DataBase')
    })
    .catch(err => {
      console.log(err)
    })
}
