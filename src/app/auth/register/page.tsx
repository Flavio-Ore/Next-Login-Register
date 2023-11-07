'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface RegisterFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      return window.alert('Password and Confirm Password must be the same')
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      })
    })

    const json = await res.json()

    if (res.ok) {
      router.push('/auth/login')
    }
    console.log('data :>> ', json)
  })
  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
        <h2 className='text-slate-200 font-bold text-4xl mb-4'>Register</h2>
        <label className='block text-slate-200 font-bold mb-2'>Username</label>
        <input
          className='block w-full p-3 mb-2 rounded bg-slate-900 text-slate-300'
          placeholder='John Doe'
          type='text'
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required'
            }
          })}
        />
        {errors.username?.message && (
          <span className='text-red-500 text-sm'>
            {errors.username?.message as string}
          </span>
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
        <label className='block text-slate-200 font-bold mb-2'>
          Confirm Password
        </label>
        <input
          className='block w-full p-3 mb-2 rounded bg-slate-900 text-slate-300'
          placeholder='********'
          type='password'
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm Password is required'
            }
          })}
        />
        <button
          className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'
          type='submit'
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
export default RegisterPage
