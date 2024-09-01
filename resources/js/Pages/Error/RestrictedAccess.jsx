// resources/js/Pages/Error/RestrictedAccess.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

export default function RestrictedAccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Restricted Access</h1>
                <p className="text-gray-600 mb-4">You do not have permission to access this page.</p>
                <Link href={route('dashboard')} className="text-blue-500 hover:underline">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}
