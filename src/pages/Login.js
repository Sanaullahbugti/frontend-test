import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState( {
        email: '',
        password: '',
    } );

    const [error, setError] = useState( '' );
    const navigate = useNavigate(); // Hook to access the history object for redirection

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( {
            ...formData,
            [name]: value,
        } );
    };

    const handleLogin = async () => {
        try {
            // Your login API call
            const response = await fetch( 'http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formData ),
            } );

            const data = await response.json();
            console.log( data )
            if ( response.ok ) {
                // Save token to local storage upon successful login
                localStorage.setItem( 'token', data.token );
                // Redirect to the dashboard
                navigate( '/home' );
            } else {
                setError( data.message || 'Login failed' );
            }
        } catch ( error ) {
            setError( 'An error occurred while logging in.' );
        }
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();

        // Validate credentials, make API calls, etc.
        if ( !formData.email || !formData.password ) {
            setError( 'Please enter both email and password.' );
            return;
        }

        // Reset any previous errors
        setError( '' );

        // Call the handleLogin function
        handleLogin();
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="flex items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Log In
                        </button>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Need an account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
