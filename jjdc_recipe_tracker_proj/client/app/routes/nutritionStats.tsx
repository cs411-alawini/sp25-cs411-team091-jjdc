import React from "react";
import { useLoaderData, Form } from "react-router-dom"; // not 'react-router'
import NutritionStatsPage from "../pages/nutritionfacts/nutritionStats"; // fixed relative import
import { getCurrentUserID } from "../services/sessions.server"; // OK inside loader

// --- loader (server-side only!) ---
export async function loader({ request }: { request: Request }) {
  const userID = await getCurrentUserID(request);
  return { userID }; // send it to the client safely
}

// --- meta info (optional) ---
export function meta() {
  return [
    { title: "Nutrition Stats" },
    { name: "description", content: "Your nutrition overview" },
  ];
}

// --- client component ---
export default function NutritionStatsRoute() {
  const { userID } = useLoaderData() as { userID: string };
  
  return <NutritionStatsPage userID={userID} />;
}

