import { TextField, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUserID } from '../services/sessions.server'
import { useLoaderData, Form } from 'react-router';
import { getAllFoodName } from '../services/services'
import { Autocomplete, AutocompleteItem } from '@heroui/react';

export async function loader({ request }: { request: Request }) {
    const allFoodNames = await getAllFoodName();
    
    return allFoodNames
}


export default function AddIngredients() {
    const allFoods: string[] = useLoaderData();
    let test = allFoods.map(food => ({ food }))

    return (
        <div>
            <Autocomplete
            className="max-w-xs"
            defaultItems={test}
            placeholder="Search a Food"
            >
            {(test) => <AutocompleteItem key={test.food}>{test.food}</AutocompleteItem>}
            </Autocomplete>
        </div>
    )
}