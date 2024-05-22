import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (

    <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 mb-10">
            <div className="flex justify-between">
                <div className="flex space-x-7">
                    <Link to="/" className="flex items-center py-4 px-2">
                        <img src="images/link.png" alt="Logo" className="h-8 w-8 mr-2" />
                        <span className="font-semibold text-gray-500 text-lg">
                            URL Shortener
                        </span>
                    </Link>
                </div>
                <div className="flex items-center space-x-1">
                    <Link to="/" className="py-4 px-2 text-gray-500 font-semibold">
                        Home
                    </Link>
                    {/* <Link to="/admin" className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                        Admin
                    </Link> */}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
