<?php

namespace App\Http\Controllers\Invites;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Plandiet\App\Invites\Actions\GetInvites;
use Plandiet\App\Invites\Actions\ResendInvite;
use Plandiet\App\Invites\Actions\RevokeInvite;
use Plandiet\App\Invites\Actions\SendInvite;
use Plandiet\App\Invites\Models\ClientInvite;
use Plandiet\App\Invites\Resources\ClientInviteResource;

class InviteController extends Controller
{

    public function index(GetInvites $invites): Response
    {
        $practitionerInvites = ClientInviteResource::collection($invites->get());

        return inertia('practitioner/invites/PractionerInvitesList', [
            'invites' => $practitionerInvites,
        ]);
    }

    public function create(): Response
    {
        return inertia('practitioner/invites/CreateInvitePage');
    }

    public function show(ClientInvite $invite): Response
    {
        return inertia('practitioner/invites/ShowInvitePage',[
            'invite' => $invite,
        ]);
    }

    public function store(Request $request, SendInvite $sendInviteAction): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'invited_name' => ['required', 'string', 'max:255'],
            'next_review_date' => ['required', 'date'],
        ]);



        DB::transaction(function () use ($data, $sendInviteAction) {
            $sendInviteAction->invite($data);
        });

        inertia()->flash([
                'toast' => [
                'type' => 'success',
                'message' => 'Invite sent to email.',
                ]
        ]);

        return redirect()->route('invites.index');

    }



    public function resend(ClientInvite $invite, ResendInvite $resendInviteAction): RedirectResponse
    {

            DB::transaction(function () use ($invite, $resendInviteAction) {
                $resendInviteAction->resend($invite);
            });

            inertia()->flash([
                'toast' => [
                'type' => 'success',
                'message' => 'Invite resent to email.',
                ]
            ]);

            return back();


    }

    public function revoke(ClientInvite $invite, RevokeInvite $revokeInviteAction): RedirectResponse
    {
            DB::transaction(function () use ($invite, $revokeInviteAction) {
                $revokeInviteAction->revoke($invite);
            });


            inertia()->flash([
                'toast' => [
                'type' => 'success',
                'message' => 'Invite revoked.',
                ]
            ]);

            return redirect()->route('invites.index');
    }
}
