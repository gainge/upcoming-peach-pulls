console.log('Freezard the goat');

/* RNG Seed Functions */
const rngAdv = (seed) => {
    return ((seed * 214013) + 2531011) % 2**32;
}
  
const rngInt = (seed, max) => {
    let n = Math.floor(seed / 2**16);
    return Math.floor((max * n) / 2**16)
}

const formatHex = (n) => {
    return n.toString(16).padStart(8, '0');
  }

function calculatePulls() {
    const seedHex = document.getElementById('seedInput').value;
    const seed = parseInt(seedHex, 16);
    const rolls = parseInt(document.getElementById('rollsInput').value);

    let activeSeed = seed;
    const results = [] // Let's just store it as a 2d array of seeds and pulls

    for (let i = 0; i < rolls; i++) {
        const nextSeed = rngAdv(activeSeed);
        const pull = getPull(nextSeed);

        results.push([activeSeed, pull]);

        activeSeed = nextSeed;
    }

    displayResults(results);
}

// Returns pull as a string, e.g. "turnip" or "stitch" or "sword"
function getPull(activeSeed) {
    const roll = rngInt(activeSeed, 128);
    const nextSeed = rngAdv(activeSeed);
    if (roll === 0) {
        // Item, determine which item
        const itemRoll = rngInt(nextSeed, 6);
        if (itemRoll <= 1) {
            return "bomb";
        } else if (itemRoll <= 4) {
            return "saturn";
        } else {
            return "sword"
        }
    } else {
        // Turnip, determine if it's a stitch
        const turnipRoll = rngInt(nextSeed, 58);
        if (turnipRoll === 57) {
            return "stitch"
        } else {
            return "turnip"
        }
    }
}

function displayResults(results) {
    const table = document.getElementById('results');
    table.innerHTML = '';

    // Add table rows like there's no tomorrow (there is)
    for (let i = 0; i < results.length; i++) {
        const tableRow = document.createElement('tr');

        const resultRow = results[i];

        const seed = resultRow[0];
        const pull = resultRow[1];

        const seedData = document.createElement('td');
        const pullData = document.createElement('td');

        seedData.innerHTML = `0x${formatHex(seed)}`;
        pullData.innerHTML = pull;

        if (pull === "stitch") {
            pullData.classList.add('highlight');
        }

        tableRow.appendChild(seedData)
        tableRow.appendChild(pullData)

        table.appendChild(tableRow);
    }
}