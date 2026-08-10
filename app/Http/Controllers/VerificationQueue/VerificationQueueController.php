<?php

namespace App\Http\Controllers\VerificationQueue;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Inertia\Response;
use Plandiet\App\PractitionerVerification\Actions\ListPractitionersVerificationQueue;

class VerificationQueueController extends Controller
{

    public function __invoke(): Response
    {
        $verificationQueue = UserResource::collection((new ListPractitionersVerificationQueue())->get());

        return inertia('admin/users/practitioners/PractitionerVerificationQueuePage', [
            'verificationQueue' => $verificationQueue,
        ]);
    }

}
