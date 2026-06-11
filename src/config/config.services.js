import { config } from 'dotenv'
import { resolve } from 'node:path'
config({ path: `./.env.development` })
export const PORT = Number(process.env.PORT)
export const HOST = process.env.HOST
export const DB_URI = process.env.DB_URI
export const DB_NAME = process.env.DB_NAME
export const HASH_SALT = Number(process.env.HASH_SALT)
export const ENCRYPTION_ALGORITM = process.env.ENCRYPTION_ALGORITM
export const CIPHER_IV_SIZE = Number(process.env.CIPHER_IV_SIZE)
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
export const SECRET_ADMIN_ACCESS_TOKEN = process.env.SECRET_ADMIN_ACCESS_TOKEN
export const SECRET_USER_ACCESS_TOKEN = process.env.SECRET_USER_ACCESS_TOKEN
export const SECRET_USER_REFRESH_TOKEN = process.env.SECRET_USER_REFRESH_TOKEN
export const SECRET_ADMIN_REFRESH_TOKEN = process.env.SECRET_ADMIN_REFRESH_TOKEN
export const TOKEN_ADMIN_PREFIX = process.env.TOKEN_ADMIN_PREFIX
export const TOKEN_USER_PREFIX = process.env.TOKEN_USER_PREFIX
