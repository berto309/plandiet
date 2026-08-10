<?php

namespace Plandiet\App\Users\Admin\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if(!auth()->user()->role->isAdmin()){
            abort(Response::HTTP_NOT_FOUND);
        }

        if(auth()->user()->status->isNotActive()){
            abort(Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
