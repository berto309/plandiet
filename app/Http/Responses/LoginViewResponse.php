<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginViewResponse as LoginViewResponseContract;

final class LoginViewResponse implements LoginViewResponseContract
{
    public function toResponse($request)
    {

        return redirect('/');

    }
}
