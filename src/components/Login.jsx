// src/components/auth/Login.jsx
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseContext } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error} = await login(email, password);

        if(!error) {

            navigate('/');

        } else {
            setError(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Bienvenido
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Correo!!!! */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password input field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"


                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesion'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;