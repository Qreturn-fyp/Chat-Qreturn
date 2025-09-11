import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    const host = process.env.NEXT_PUBLIC_HOST_URL;
    return (
        <nav className="relative px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Chat-Qreturn
                    </span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href={`${host}/#features`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Features
                    </a>
                    <a href={`${host}/#about`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        About
                    </a>
                    <a href={`${host}/#contact`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Contact
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href={`${host}/pages/login`}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href={`${host}/pages/createAccount`}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    )
}