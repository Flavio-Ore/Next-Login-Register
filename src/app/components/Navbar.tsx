import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Navbar = async () => {
  const userSession = await getServerSession(authOptions)
  return (
    <nav className='flex justify-between bg-zinc-950 text-slate-200 px-24 py-3'>
      <h1 className='text-2xl font-bold'>NextAuth</h1>
      <ul className='flex gap-x-2'>
        {userSession ? (
          <>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link href='/api/auth/signout'>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/auth/login'>Login</Link>
            </li>
            <li>
              <Link href='/auth/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
