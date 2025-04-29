// src/pages/NutritionStatsPage.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";  // or use fetch
import { Link } from "react-router-dom";

interface NutritionStats {
    sumCalories: number;
    sumCarbohydrates: number;
    sumFat: number;
    sumProtein: number;
    avgCalories?: number;
    avgCarbohydrates?: number;
    avgFat?: number;
    avgProtein?: number;
}

interface NutritionStatsPageProps {
    userID?: string; // make it optional if you want
  }
  
  const NutritionStatsPage: React.FC<NutritionStatsPageProps> = ({ userID }) => {
      const [nutritionStats, setNutritionStats] = useState<NutritionStats | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [calorieGoal, setCalorieGoal] = useState<number | null>(null);
  
      useEffect(() => {
          const fetchStats = async () => {
              try {
                  const response = await axios.get("/nutritionstats");
                  console.log(response.data);
                  
                  const data = response.data;
                  const todayStats = data[0]?.[0];
                  const weeklyAvgStats = data[1]?.[0];
  
                  setNutritionStats({
                      sumCalories: todayStats?.sumCalories || 0,
                      sumCarbohydrates: todayStats?.sumCarbohydrates || 0,
                      sumFat: todayStats?.sumFat || 0,
                      sumProtein: todayStats?.sumProtein || 0,
                      avgCalories: weeklyAvgStats?.avgCalories,
                      avgCarbohydrates: weeklyAvgStats?.avgCarbohydrates,
                      avgFat: weeklyAvgStats?.avgFat,
                      avgProtein: weeklyAvgStats?.avgProtein,
                  });
              } catch (err) {
                  console.error(err);
                  setError("Failed to fetch nutrition stats.");
              } finally {
                  setLoading(false);
              }
          };
  
          fetchStats();
      }, []);

      const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setCalorieGoal(value);
        } else {
            setCalorieGoal(null);
        }
    };

    const renderCalorieComparison = () => {
        if (nutritionStats && calorieGoal !== null) {
            const difference = calorieGoal - nutritionStats.sumCalories;
            if (difference > 0) {
                return <p className="text-green-600">You are under your calorie goal by {difference} calories. 🎯</p>;
            } else if (difference < 0) {
                return <p className="text-red-600">You are over your calorie goal by {Math.abs(difference)} calories. ⚠️</p>;
            } else {
                return <p className="text-blue-600">You exactly hit your calorie goal! 🎉</p>;
            }
        }
        return null;
    };
  
      if (loading) return <div className="text-center mt-10">Loading...</div>;
      if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  
      return (
          <div className="overflow-hidden bg-white py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <Link to="/" className="text-grey-600 hover:underline mb-4 inline-block">← Back to Home</Link>
  
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                      Nutrition Stats
                  </h1>
  
                  {/* OPTIONAL: You can show the user ID somewhere if you want */}
                  {userID && (
                      <p className="mb-4 text-gray-500">User ID: {userID}</p>
                  )}
                    {/* Input for Calorie Goal */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Set Your Daily Calorie Goal:
  </label>
  <input
    type="number"
    value={calorieGoal ?? ''}
    onChange={handleGoalChange}
    placeholder="Enter calorie goal (e.g., 2500)"
    className="border p-2 rounded w-full max-w-xs"
  />
</div>
                  {/* Show the comparison result */}
                {renderCalorieComparison()}
  
                  {nutritionStats && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="p-6 rounded-lg border shadow-md">
                              <h2 className="text-xl font-semibold mb-4 text-indigo-600">Today's Total</h2>
                              <p><strong>Calories:</strong> {nutritionStats.sumCalories}</p>
                              <p><strong>Carbs:</strong> {nutritionStats.sumCarbohydrates}g</p>
                              <p><strong>Fat:</strong> {nutritionStats.sumFat}g</p>
                              <p><strong>Protein:</strong> {nutritionStats.sumProtein}g</p>
                          </div>
  
                          <div className="p-6 rounded-lg border shadow-md">
                              <h2 className="text-xl font-semibold mb-4 text-indigo-600">Weekly Average</h2>
                              <p><strong>Avg Calories:</strong> {nutritionStats.avgCalories ?? 'N/A'}</p>
                              <p><strong>Avg Carbs:</strong> {nutritionStats.avgCarbohydrates ?? 'N/A'}g</p>
                              <p><strong>Avg Fat:</strong> {nutritionStats.avgFat ?? 'N/A'}g</p>
                              <p><strong>Avg Protein:</strong> {nutritionStats.avgProtein ?? 'N/A'}g</p>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
  };
  
  export default NutritionStatsPage;
  
