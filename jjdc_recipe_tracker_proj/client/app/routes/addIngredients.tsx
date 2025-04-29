import { TextField, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUserID } from '~/services/sessions.server';
import { useLoaderData, Form } from 'react-router';
import { getAllFoodName } from '../services/services'
import { Autocomplete, AutocompleteItem } from '@heroui/react';

export async function loader({ request }: { request: Request }) {
    const allFoodNames = await getAllFoodName();
    
    return allFoodNames
}


export default function AddIngredients() {
    const allFoods = useLoaderData();
    console.log(allFoods)
    // let test = allFoods.map((food) => ({ food }))

    return (
        <div className="main w-full" >
            <Autocomplete
            className="max-w-xs  justify-center"
            defaultItems={allFoods}
            placeholder="Search a Food"
            >
            {(food) => <AutocompleteItem key={food.FoodName}>{food.FoodName}</AutocompleteItem>}
            </Autocomplete>
        </div>
    )
}