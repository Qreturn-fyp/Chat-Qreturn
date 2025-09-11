"use client"
import { useEffect, useState } from 'react';
import NavBar from '@/component/Nav/NavBar';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    useEffect(() => {
        handleLogin();
    }, [username, email]);

    const handleLogin = () => {
        const data = {
            username: username,
            email: email,
            password: password,
            repassword: repassword
        };
        if (password !== repassword) {
            toast.error("Passwords do not match!");
            return;
        };
        console.log(data);
    };

    return (
        <>
            <NavBar />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col items-center justify-center py-2 mt-30 m-1">
                <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
                    <div className="mb-8 justify-center items-center">
                        <h2 className="text-gray-200 text-center text-2xl">Create New Account Here</h2>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            User Name
                        </label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Jhone-Wick" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="sample@mail.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="password" placeholder="Password" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2">
                            Re-Password
                        </label>
                        <input value={repassword} onChange={(e) => setRePassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="password" placeholder="Password" />
                    </div>
                    <div className="mb-4">
                        <Link href="/pages/login" className="text-sm text-blue-500 hover:text-blue-700">Already have one?</Link>
                    </div>
                    <div className="mb-4">
                        <button onClick={handleLogin} type="button" className="pl-5 pr-5 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                    </div>
                </div>
            </div>
        </>
    );
}
