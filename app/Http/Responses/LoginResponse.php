<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

final class LoginResponse implements LoginResponseContract
{
    public function __construct()
    {

    }
    public function toResponse($request)
    {
        $loggedInUser = $request->user();

        if ($loggedInUser->role->isAdmin()) {
            return redirect('/admin');
        } else if($loggedInUser->role->isPractitioner()) {
            return redirect('/practitioner');
        } else {
            return redirect('/client');
        }
    }
}
