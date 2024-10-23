<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $validCredentials = [
            'Europe' => 'europe123',
            'USA' => 'usa123',
            'Brazil' => 'brazil123'
        ];

        if (array_key_exists($credentials['username'], $validCredentials) &&
            $validCredentials[$credentials['username']] === $credentials['password']) {
            Auth::loginUsingId($credentials['username']);
            return redirect()->intended('machines');
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}