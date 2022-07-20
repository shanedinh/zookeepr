const express = require('express');
const { animals } = require('./data/animals');

const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArry = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array an d save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArry = [query.personalityTraits];
        } else {
            personalityTraitsArry = query.personalityTraits;
        }
        // Loop through eac trai in the personalityTraits array:
        personalityTraitsArry.forEach(trait => {
            // Check the trait against each animal in the filteredResults array
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contai the trait,
            // so at the end we'll have an array of animals that have every one
            // of the traist whe the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filteredResults
    return filteredResults;
};

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});


