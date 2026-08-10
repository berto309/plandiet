<?php

namespace Plandiet\App\Users\Practitioner\Middleware;

use Closure;
use Illuminate\Http\Request;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Symfony\Component\HttpFoundation\Response;

class PractitionerVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $profile = PractitionerProfile::where('user_id', $request->user()->id)->select('verification_status')->first();

        if (! $profile || $profile->verification_status !== VerificationStatusEnum::VERIFIED) {
            abort(
                code: Response::HTTP_UNAUTHORIZED,
                message: "Your practitioner account is pending verification. You can upload documents but cannot manage clients until verified."
            );
        }

        return $next($request);
    }
}
