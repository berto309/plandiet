<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Plandiet\App\PractitionerVerification\Actions\UpdatePractitionerVerificationStatus;
use Plandiet\App\Users\Practitioner\Actions\ListPractitioners;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\App\Users\Practitioner\Requests\PractitionerRequest;

class PractitionersManagementController extends Controller
{

    public function index(): Response
    {
        $practitioners = (new ListPractitioners())->get();

        return inertia('admin/users/practitioners/PractitionersPage', [
            'practitioners' => $practitioners,
        ]);
    }

    public function show(User $practitioner): Response
    {

        $practitioner = (new UserResource($practitioner->load([
            'media' => fn ($query) =>
            $query->whereIn('collection_name', [
                'proof-of-address',
                'proof-of-identity',
                'qualification-certificate',
            ]),
            'practitionerProfile' => ['statusUpdater:id,name']
        ])));

        return inertia('admin/users/practitioners/PractitionerProfilePage', [
            'practitioner' => $practitioner,
            'verificationStatuses' => VerificationStatusEnum::toArray(),
        ]);
    }


    public function update(PractitionerRequest $request, User $practitioner, UpdatesUserProfileInformation $updater): RedirectResponse
    {
        $practitionerUserAccountData = $this->getPractitionerUserAccountData($request);
        $practitionerProfileData = $this->getPractitionerProfileData($request);

        DB::transaction(function () use ($practitionerUserAccountData, $practitionerProfileData, $practitioner, $updater) {
            $updater->update($practitioner, $practitionerUserAccountData);

            $practitionerProfile = PractitionerProfile::where('user_id', $practitioner->id)->first();
            $practitionerProfile->update($practitionerProfileData);
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Practitioner account updated.'
        ]);

        return back();
    }

    public function updateVerificationStatus(Request $request, int $id, UpdatePractitionerVerificationStatus $statusUpdater)
    {

        $data = $request->validate([
            'verification_status' => ['required', Rule::enum(VerificationStatusEnum::class)],
            'rejection_reason' => ['nullable', 'string', 'max:500'],
            'suspension_reason' => ['nullable', 'string','max:500'],
        ]);


        DB::transaction(function () use ($id, $data, $statusUpdater) {
            $statusUpdater->update($id, $data);
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Practitioner verification updated.'
        ]);

        return to_route('practitioners.show', ['practitioner' => $id]);
    }


    public function destroy(string $id)
    {
        //
    }

    protected function getPractitionerUserAccountData(PractitionerRequest $request): array
    {
        return $request->safe()->only(['name', 'email', 'role', 'gender', 'date_of_birth', 'phone']);
    }

    protected function getPractitionerProfileData(PractitionerRequest $request): array
    {
        return $request->safe()->only(['professional_title', 'credential_type', 'registration_number', 'regulator', 'bio', 'website']);
    }
}
