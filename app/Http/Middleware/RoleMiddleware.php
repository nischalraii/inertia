<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Check if the authenticated user has the required role
        if (!Auth::check() || !Auth::user()->roles->contains('name', $role)) {
            // Return a 'Restricted Access' view if the user does not have the required role
            return Inertia::render('Error/RestrictedAccess');
        }

        return $next($request);
    }
}
