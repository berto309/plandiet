import TodayMealPlanController from './TodayMealPlanController'
import MealPlanController from './MealPlanController'
import MealSwapController from './MealSwapController'
import MealRatingController from './MealRatingController'
const Meal = {
    TodayMealPlanController: Object.assign(TodayMealPlanController, TodayMealPlanController),
MealPlanController: Object.assign(MealPlanController, MealPlanController),
MealSwapController: Object.assign(MealSwapController, MealSwapController),
MealRatingController: Object.assign(MealRatingController, MealRatingController),
}

export default Meal