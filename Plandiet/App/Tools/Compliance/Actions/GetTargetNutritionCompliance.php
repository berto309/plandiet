<?php declare(strict_types=1);


namespace Plandiet\App\Tools\Compliance\Actions;
use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;

final class GetTargetNutritionCompliance
{
    /**
     * Returns the nutrition compliance of a client percentage wise i.e. out of 100
     * Could be more than 100
     * @return int[]
     */
    public function get(int $id): array
    {
        $clientHealthProfile = ClientHealthProfile::where('user_id', $id)->select(['target_calories', 'target_protein_g', 'target_carbs_g', 'target_fat_g', 'target_fibre_g', 'target_sodium_mg'])->first();
        $clientMealsNutritionTargetTotal = MealPlanItem::where('client_id', $id)
                                        ->selectRaw('
                                            SUM(calories) as total_calories,
                                            SUM(protein_g) as total_protein,
                                            SUM(carbs_g) as total_carbs,
                                            SUM(fat_g) as total_fat,
                                            SUM(sat_fat_g) as total_sat_fat,
                                            SUM(fibre_g) as total_fibre,
                                            SUM(sodium_mg) as total_sodium
                                        ')->first();


        return [
            'calories' => round(($clientMealsNutritionTargetTotal->total_calories / $clientHealthProfile->target_calories) * 100),
            'protein_g' => round(($clientMealsNutritionTargetTotal->total_protein / $clientHealthProfile->target_protein_g) * 100),
            'carbs_g' =>  round(($clientMealsNutritionTargetTotal->total_carbs / $clientHealthProfile->target_carbs_g) * 100),
            'fat_g' =>  round(($clientMealsNutritionTargetTotal->total_fat / $clientHealthProfile->target_fat_g) * 100),
            'sodium_mg' =>  round(($clientMealsNutritionTargetTotal->total_sodium / $clientHealthProfile->target_sodium_mg) * 100),
            'fibre_g' =>  round(($clientMealsNutritionTargetTotal->total_fibre / $clientHealthProfile->target_fibre_g) * 100),
        ];
    }
}
