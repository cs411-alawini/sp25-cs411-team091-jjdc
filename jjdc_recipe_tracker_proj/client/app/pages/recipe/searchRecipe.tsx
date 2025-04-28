import { useParams } from 'react-router';

// const searchRecipePage: React.FC = () => {
//     const { RecipeID } = useParams(); // Access pokemonID from the URL
//         return (
//         <div>
//             <h1>Details for Recipe ID: {RecipeID}</h1>
//         </div>
//     );
// };

export function SearchRecipePage(){
    const { RecipeID } = useParams(); // Access pokemonID from the URL
    return (
        <div>
            <h1>Details for Recipe ID: {RecipeID}</h1>
        </div>
    );
};
