<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class AdminSettingsController extends Controller
{

    public function index(): Response
    {
        return inertia('admin/settings/AdminSettings');
    }

    public function update(Request $request, string $id)
    {
        //
    }

}
