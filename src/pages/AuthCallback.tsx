import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';


export const AuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setCredentials, getProfile } = useAuth();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const token = searchParams.get('token');
            const email = searchParams.get('email');
            const name = searchParams.get('name');

            if (token && email && name) {
                try {
                    setCredentials({
                        user: {
                            id: 0, 
                            email: decodeURIComponent(email),
                            name: decodeURIComponent(name),
                        },
                        token,
                    });

                    await getProfile();

                    navigate('/', { replace: true });
                } catch (error) {
                    console.error('Auth callback error:', error);
                    navigate('/login', { replace: true });
                }
            } else {
                console.error('Missing auth parameters');
                navigate('/login', { replace: true });
            }
        };

        handleAuthCallback();
    }, [searchParams, navigate, setCredentials, getProfile]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
};