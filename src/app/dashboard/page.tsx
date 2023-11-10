'use client'

import { signOut } from 'next-auth/react'

const DashboardPage = () => {
  return (
    <section className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <h2 className='text-4xl font-bold text-slate-200'>Dashboard</h2>
      <button
        className='bg-white text-black px-4 py-2 rounded-md mt-4'
        onClick={() => signOut()}
      >
        Logout
      </button>
    </section>
  )
}

export default DashboardPage
