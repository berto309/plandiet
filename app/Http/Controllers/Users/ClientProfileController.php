<?php

namespace App\Http\Controllers\Users;

use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\Infrastructure\Enums\GenderEnum;


class ClientProfileController extends Controller
{

    public function index(): Response
    {
        return inertia('client/profile/ClientAccountProfilePage', [
            'genders' => GenderEnum::toArray()
        ]);
    }


    public function edit(): Response
    {
        return inertia('client/profile/EditClientAccountProfilePage', [
            'genders' => GenderEnum::toArray()
        ]);
    }

    public function update(Request $request, UpdateUserProfileInformation $updater): RedirectResponse
    {

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'role' => $request->role,
            'status' => $request->status,
            'post_code' => $request->post_code,
            'city' => $request->city,
            'address' => $request->address,
        ];

        $updater->update(auth()->user(), $data);

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Profile updated.'
        ]);

        return back();
    }

    public function changePassword(Request $request, UpdateUserPassword $updater): RedirectResponse
    {
        $data = [
            'current_password' => $request->current_password,
            'password' => $request->password,
            'password_confirmation' => $request->password_confirmation,
        ];

        $updater->update(auth()->user(), $data);

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Password updated. Please login again.'
        ]);

        auth()->logout();

        return redirect('/');

    }



}
