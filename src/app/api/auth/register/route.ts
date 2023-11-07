import db from '@/libs/db'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST (request: NextRequest) {
  try {
    const data = await request.json()

    console.log('data :>> ', data)

    const [usernameFound, emailFound] = await Promise.all([
      db.user.findUnique({ where: { username: data.username } }),
      db.user.findUnique({ where: { email: data.email } })
    ])

    if (usernameFound && emailFound)
      return NextResponse.json(
        { message: 'Username and email already exists' },
        { status: 400 }
      )

    if (usernameFound)
      return NextResponse.json(
        {
          message: 'Username already exists'
        },
        { status: 400 }
      )

    if (emailFound)
      return NextResponse.json(
        {
          message: 'Email already exists'
        },
        { status: 400 }
      )

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    })

    return NextResponse.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong'
      },
      { status: 500 }
    )
  }
}
