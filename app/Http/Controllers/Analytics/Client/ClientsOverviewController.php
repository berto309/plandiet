<?php

namespace App\Http\Controllers\Analytics\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Users\Client\Actions\ListClients;
use Plandiet\App\Users\Practitioner\Actions\ListPractitioners;

class ClientsOverviewController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request): Response
    {
        $clients = UserResource::collection((new ListClients())->get());

        return inertia('admin/users/clients/ClientsPage', [
            'clients' => $clients,
        ]);
    }

    public function show(User $client): Response
    {
        $client = (new UserResource($client->load(['clientHealthProfile', 'nutritionRules'])));

        return inertia('admin/users/clients/ClientProfilePage', [
            'client' => $client,
        ]);
    }
}
