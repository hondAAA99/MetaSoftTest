import crypto from 'crypto'
const KEY = crypto.scryptSync(
  process.env.ENCRYPT_SECRET || 'secret',
  'salt',
  32,
)
const IV = Buffer.alloc(16, 0)
export function Globalencrypt({ plainText }) {
  const cipher = crypto.createCipheriv('aes-256-cbc', KEY, IV)
  let encrypted = cipher.update(String(plainText), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}
