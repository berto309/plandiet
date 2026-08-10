<?php

namespace Plandiet\App\Users\Practitioner\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PractitionerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(!auth()->user()->role->isPractitioner()) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return $next($request);
    }
}
