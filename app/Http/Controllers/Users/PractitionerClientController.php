<?php


namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Mail\NextReviewDateMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Plandiet\App\Meal\Enums\AllergyEnum;
use Plandiet\App\Meal\Enums\CuisinePreferencesEnum;
use Plandiet\App\Meal\Enums\DietaryPreferencesEnum;
use Plandiet\App\Meal\Enums\DietIntolerancesEnum;
use Plandiet\App\Meal\Enums\DietPrimaryGoalEnum;
use Plandiet\App\PractitionerVerification\Actions\UpdatePractitionerVerificationStatus;
use Plandiet\App\Users\Client\Enums\ClientConditionsEnum;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;
use Plandiet\App\Users\Client\Requests\ClientHealthProfileRequest;
use Plandiet\App\Users\Practitioner\Actions\ListPractitionerClients;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\App\Users\Practitioner\Requests\PractitionerRequest;

class PractitionerClientController extends Controller
{

    public function index(): Response
    {
        $practitionerClients = (new ListPractitionerClients())->get();

        return inertia('practitioner/practioner-clients/PractitionerClientsPage', [
            'practitioner_clients' => $practitionerClients,
        ]);
    }

    public function create(User $client): Response|RedirectResponse
    {
        $clientHasHealthProfile = ClientHealthProfile::where('user_id', $client->id)->exists();

        if($clientHasHealthProfile){
            return redirect()->route('practitioner.clients');
        }

       return inertia('practitioner/practioner-clients/CreateClientHealthProfilePage', [
           'client' => $client,
           'intolerancesList' =>  DietIntolerancesEnum::toArray(),
           'dietaryPreferencesList' => DietaryPreferencesEnum::toArray(),
           'dietPrimaryGoalsList' => DietPrimaryGoalEnum::toArray(),
           'cuisinePreferencesList' => CuisinePreferencesEnum::toArray(),
           'allergiesList' => AllergyEnum::toArray(),
           'conditionsList' => ClientConditionsEnum::toArray()
       ]) ;
    }

    public function store(ClientHealthProfileRequest $request, User $client): Response|RedirectResponse
    {
        $clientHasHealthProfile = ClientHealthProfile::where('user_id', $client->id)->exists();

        if($clientHasHealthProfile){
            return redirect()->route('practitioner.clients');
        }

        $data = $request->validated();

        DB::transaction(function () use ($client, $data) {
            ClientHealthProfile::create($data);
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Client health profile created.'
        ]);

        return back();


        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Practitioner health profile created.'
        ]);

        return redirect()->route('practitioner.clients.show', ['client' => $client]);

    }

    public function show(User $client): Response
    {
        $practitionerClient = (new UserResource($client->load(['clientHealthProfile', 'nutritionRules', 'clientPractitioner'])));

        return inertia('practitioner/practioner-clients/PractitionerClientProfilePage', [
            'client' => $practitionerClient,
        ]);
    }

    public function edit(User $client): Response
    {
        $practitionerClient = (new UserResource($client->load(['clientHealthProfile', 'nutritionRules', 'clientPractitioner'])));

        return inertia('practitioner/practioner-clients/EditPractitionerClientProfilePage', [
            'client' => $practitionerClient,
            'intolerancesList' =>  DietIntolerancesEnum::toArray(),
            'dietaryPreferencesList' => DietaryPreferencesEnum::toArray(),
            'dietPrimaryGoalsList' => DietPrimaryGoalEnum::toArray(),
            'cuisinePreferencesList' => CuisinePreferencesEnum::toArray(),
            'allergiesList' => AllergyEnum::toArray(),
            'conditionsList' => ClientConditionsEnum::toArray()
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

    public function updateVerificationStatus(Request $request, int $id, UpdatePractitionerVerificationStatus $statusUpdater): RedirectResponse
    {

        $data = $request->validate([
            'verification_status' => ['required', Rule::enum(VerificationStatusEnum::class)],
            'rejection_reason' => ['nullable', 'string', 'max:500'],
            'suspension_reason' => ['nullable', 'string', 'max:500'],
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


    public function updateClientHealthProfile(ClientHealthProfileRequest $request, User $client)
    {
        $data = $request->validated();

        DB::transaction(function () use ($client, $data) {
            ClientHealthProfile::where('user_id', $client->id)->update($data);
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Clinical notes updated.'
        ]);

        return back();
    }

    public function updateClinicalNotes(Request $request, User $client): RedirectResponse
    {
        $data = $request->validate([
            'clinical_notes' => ['nullable', 'string', 'max:500'],
        ]);

        DB::transaction(function () use ($client, $data) {
            PractitionerClient::where(['practitioner_id' => auth()->id(),'user_id' => $client->id])->update($data);
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Clinical notes updated.'
        ]);

        return back();


    }

    public function updateClientNextReviewDate(Request $request, User $client): RedirectResponse
    {
        $data = $request->validate([
            'next_review_date' => ['required', 'date', 'after:now'],
        ], attributes: [
            'next_review_date' => 'next review date',
        ]);

        DB::transaction(function () use ($client, $data) {
            PractitionerClient::where(['practitioner_id' => auth()->id(),'user_id' => $client->id])->update($data);

            Mail::to($client->email)
                ->send(new NextReviewDateMail(
                    clientName: $client->name,
                    practitionerName: auth()->user()->name,
                    nextReviewDate: $data['next_review_date']
                ));
        });

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Next review date updated.'
        ]);

        return back();


    }

    protected function getPractitionerProfileData(PractitionerRequest $request): array
    {
        return $request->safe()->only(['professional_title', 'credential_type', 'registration_number', 'regulator', 'bio', 'website']);
    }


}
