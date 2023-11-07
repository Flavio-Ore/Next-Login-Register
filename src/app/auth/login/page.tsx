'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    console.log('res :>> ', res)
    if (res.error) return setError(res.error)

    router.push('/dashboard')
  })

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form className='w-1/4' onSubmit={onSubmit}>
        <h2 className='text-slate-200 font-bold text-4xl mb-4'>Login</h2>
        {error && (
          <p className='bg-red-500 text-slate-200 text-lg p-3 rounded mb-2'>
            <small>{error}</small>
          </p>
        )}
        <label className='block text-slate-200 font-bold mb-2'>Email</label>
        <input
          className='block w-full p-3 mb-2 rounded bg-slate-900 text-slate-300'
          placeholder='jhonydoe@somemail.com'
          type='email'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email is invalid'
            }
          })}
        />
        {errors.email?.message && (
          <span className='text-red-500 text-sm'>
            {errors.email?.message as string}
          </span>
        )}
        <label className='block text-slate-200 font-bold mb-2'>Password</label>
        <input
          className='block w-full p-3 mb-2 rounded bg-slate-900 text-slate-300'
          placeholder='********'
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
        />
        {errors.password?.message && (
          <span className='text-red-500 text-sm'>
            {errors.password?.message as string}
          </span>
        )}
        <button
          className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
