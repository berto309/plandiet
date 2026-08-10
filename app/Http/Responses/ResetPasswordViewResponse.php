<?php


namespace App\Http\Responses;

use Laravel\Fortify\Contracts\ResetPasswordViewResponse as ResetPasswordViewResponseContract;
use Inertia\Inertia;

class ResetPasswordViewResponse implements ResetPasswordViewResponseContract
{
    public function toResponse($request)
    {
        return Inertia::render('auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'status' => session('status'),
        ]);


    }
}
