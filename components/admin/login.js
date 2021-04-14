/*  ./components/admin/login.js     */
import { signIn } from 'next-auth/client'

export default function Login () {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <a href="/">
            <img className="mx-auto h-12 w-auto" src="/logo.png" alt="sufian.cloud" />
          </a>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Denied! You must be signed in to view this page
          </h2>
          <p className="mt-20 text-center text-sm text-gray-600">
            <a href="/api/auth/signin" className="text-xl font-medium text-indigo-600 hover:text-indigo-500"
              onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>Sign in using Github or Google account</a>
          </p>
        </div>
      </div>
    </div>
    
  )
}
