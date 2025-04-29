import { TextField, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUserID } from '../services/sessions.server'
import { useLoaderData, Form } from 'react-router';
import { getAllFoodName } from '../services/services'

export async function loader({ request }: { request: Request }) {
    const allFoodNames = getAllFoodName();
    
    return allFoodNames
}


export default function AddIngredients() {
    const allFoods = useLoaderData();

    return (
        <div>

        </div>
    )
}