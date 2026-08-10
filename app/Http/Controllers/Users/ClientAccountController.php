<?php


namespace App\Http\Controllers\Users;

use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Controllers\Controller;
use App\Mail\ClientAcceptedInviteMail;
use App\Mail\InvitationAcceptedMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Nette\Schema\ValidationException;
use Plandiet\App\Invites\Models\ClientInvite;
use Plandiet\App\Users\Practitioner\Actions\UpdatePractitionerProfileInformation;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;


class ClientAccountController extends Controller
{


    public function acceptInvite(Request $request): RedirectResponse
    {
        $data = $request->validate(rules: [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'string', 'max:20'],
            'date_of_birth' => ['required', 'date'],
            'gender' => ['required', Rule::enum(GenderEnum::class)],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:8'],
            'practitioner_id' => 'required|exists:users,id',
            'invite_id' => 'required|exists:client_invites,id',
            'address' => ['nullable', 'string', 'max:255'],
            'post_code' => ['nullable', 'string', 'max:255'],
            'token' => 'required|exists:client_invites,token',
        ], messages: [
            'invite_id.exists' => 'Invitation invalid.',
        ]);

        $userData = array_merge(
            $request->only(['name', 'email', 'phone', 'date_of_birth', 'gender', 'address', 'post_code', 'password', 'post_code', 'address', 'post_code'])
            , ['status' => UserStatusEnum::ACTIVE->value]
        );

        DB::transaction(function () use ($userData, $data) {
            $user = User::create($userData);

            $invite = ClientInvite::findOrFail($data['invite_id']);

            if($invite->token !== $data['token']) {
                return back()->with('status', 'Invitation invalid.');
            } else if(Carbon::parse($invite->expires_at)->isPast()) {
                return back()->with('status', 'Invitation expired.');
            }

            $practitioner = User::findOrFail($data['practitioner_id'])->select(['id', 'name', 'email'])->first();

            ClientInvite::where('id', $data['invite_id'])->update([
                'accepted_at' => now(),
            ]);

            PractitionerClient::create([
                'practitioner_id' => $data['practitioner_id'],
                'user_id' => $user->id,
                'enrolled_at' => now(),
                'status' => UserStatusEnum::ACTIVE,
                'next_review_date' => $invite->next_review_date,
            ]);

            Mail::to($user->email)
                ->send(new InvitationAcceptedMail(
                    $user->name,
                    $practitioner->name,
                    $invite->next_review_date
                ));

            Mail::to($practitioner->email)
                ->send(new ClientAcceptedInviteMail(
                    $user->name,
                    $invite->next_review_date,
                    route('pratitioner.clients.create-health-profile', ['client' => $user->id])
                ));

        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Invitation accepted.'
        ]);

        return redirect('/');

    }


}
