import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-100">
      <h1 className="text-4xl font-bold mb-10">Welcome</h1>
      <p className="text-lg mb-10">Please choose an option to continue</p>
      <div className="flex space-x-4">
        <Link href="/login" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Login
        </Link>
        

        <Link href="/register" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
            Register
        </Link>
      </div>
    </div>
  );
}
