"use client"
import NavBar from '@/component/Nav/NavBar';
import Link from 'next/link'
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        };
        console.log(data);
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center py-2 mt-40 m-1">
                <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
                    <div className="mb-8 justify-center items-center">
                        <h2 className="text-gray-200 text-center text-2xl">Login</h2>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="text" 
                            placeholder="sample@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
                            id="Password" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Link href="/pages/createAccount" className="text-sm text-blue-500 hover:text-blue-700">Are you new?</Link>
                    </div>
                    <div className="mb-4">
                        <button 
                            type="button" 
                            onClick={handleLogin}
                            className="pl-5 pr-5 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
