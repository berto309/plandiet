<?php


namespace App\Http\Controllers\Audits;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Plandiet\App\Audits\Actions\GetNutritionRuleHistory;
use Plandiet\App\Audits\Models\NutritionRuleHistory;
use Plandiet\App\Audits\Resources\NutritionRuleHistoryResource;
use Plandiet\App\Invites\Actions\GetInvites;
use Plandiet\App\Invites\Actions\ResendInvite;
use Plandiet\App\Invites\Actions\RevokeInvite;
use Plandiet\App\Invites\Actions\SendInvite;
use Plandiet\App\Invites\Models\ClientInvite;
use Plandiet\App\Invites\Resources\ClientInviteResource;

class NutritionRuleHistoryController extends Controller
{

    public function index(): Response
    {
        $nutritionRuleHistory = NutritionRuleHistoryResource::collection(app(GetNutritionRuleHistory::class)->get());

        return inertia('admin/audits/NutritionRuleHistoryPage', [
            'nutritionRuleHistory' => $nutritionRuleHistory,
        ]);
    }

    public function show(NutritionRuleHistory $nutritionRuleHistory): Response
    {
        return inertia('admin/audits/ShowNutritionRuleHistoryPage', [
            'nutritionRuleHistoryItem' => $nutritionRuleHistory->load('nutritionRule', 'user:id,name'),
        ]);
    }
}
