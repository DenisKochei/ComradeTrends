import { Link } from "react-router-dom"

export function Logo() {
  return (
    <div>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xs  font-semibold dark:text-white'>
        <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
        Trends
      </Link>
    </div>
  )
}
