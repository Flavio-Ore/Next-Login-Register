import db from '@/libs/db'
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize (credentials, req) {
        try {
          console.log('credentials :>> ', credentials)

          const userFound = await db.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!userFound) throw new Error('User not found')

          const matchedPassword = await bcrypt.compare(
            credentials.password,
            userFound.password
          )

          console.log('userFound :>> ', userFound)
          if (!matchedPassword) throw new Error('User not found')

          return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email
          } as any
        } catch (error) {
          console.log('error :>> ', error)
          throw new Error(error.message)
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.JWT_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
