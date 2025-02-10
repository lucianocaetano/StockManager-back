import { User as IUser } from '@prisma/client';
import jwt from 'jsonwebtoken'

const generate = (user: IUser) => {
  const secret = process.env.JWT_SECRET || 'secret_key_12345'
  return jwt.sign({uid: user.id, user}, secret, {expiresIn: 600 * 200})
}

export default generate
