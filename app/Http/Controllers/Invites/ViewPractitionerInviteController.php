<?php

namespace App\Http\Controllers\Invites;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Invites\Models\ClientInvite;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\Infrastructure\Enums\GenderEnum;


class ViewPractitionerInviteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ClientInvite $invite, User $practitioner, string $token): Response
    {
        return inertia('client/invites/AcceptPractitionerInvitePage', [
            'inviteId' => $invite->id,
            'token' => $token,
            'practitionerId' => $practitioner->id,
            'genders' => GenderEnum::toArray()
        ]);
    }
}
