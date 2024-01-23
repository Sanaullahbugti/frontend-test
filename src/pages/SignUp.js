import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState( {
    email: '',
    password: '',
    confirmPassword: '',
  } );

  const [passwordMatch, setPasswordMatch] = useState( true );
  const [error, setError] = useState( '' );
  const navigate = useNavigate()

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setFormData( {
      ...formData,
      [name]: value,
    } );
    if ( name === 'confirmPassword' ) {
      setPasswordMatch( value === formData.password );
    }
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    if ( formData.password !== formData.confirmPassword ) {
      setPasswordMatch( false );
      setError( 'Passwords do not match.' );
      return;
    }

    try {
      // Make API call to signup endpoint
      const response = await fetch( 'http://localhost:3002/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          email: formData.email,
          password: formData.password,
        } ),
      } );

      if ( response.ok ) {
        // Signup successful, you can redirect or handle success as needed

        console.log( 'Signup successful' );
        navigate( "/login" )
      } else {
        // Handle signup error
        const data = await response.json();
        setError( data.message || 'Signup failed.' );
      }
    } catch ( error ) {
      // Handle fetch error
      setError( 'An error occurred during signup.' );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
              className={`w-full border p-2 rounded ${ passwordMatch ? 'border-gray-300' : 'border-red-500' }`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${ passwordMatch ? 'border-gray-300' : 'border-red-500' }`}
              required
            />
            {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-blue-500 hover:underline">
              Have an account? Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
