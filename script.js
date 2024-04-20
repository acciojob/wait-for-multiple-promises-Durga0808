//your JS code here. If required.
// Function to create a promise that resolves after a random delay between 1 to 3 seconds
function createRandomPromise(index) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 3) + 1; // Random delay between 1 to 3 seconds
        setTimeout(() => {
            resolve(delay);
        }, delay * 1000); // Convert delay to milliseconds
    }).then(result => {
        console.log(`Promise ${index} resolved after ${result} seconds`);
        return result; // Return the resolved value (delay)
    });
}

const promises = [];

// Create 3 promises and push them into the array
for (let i = 1; i <= 3; i++) {
    promises.push(createRandomPromise(i));
}


// Display loading message while promises are resolving
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
document.getElementById('output').appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
    .then(results => {
        // Remove loading message
        loadingRow.remove();

        // Populate the table with the resolved values
        results.forEach((result, index) => {
            const row = document.createElement('tr');
            const promiseCell = document.createElement('td');
            const timeCell = document.createElement('td');

            promiseCell.textContent = `Promise ${index + 1}`;
            timeCell.textContent = `${result} seconds`;

            row.appendChild(promiseCell);
            row.appendChild(timeCell);
            document.getElementById('output').appendChild(row);
        });

        // Calculate total time taken to resolve all promises
        const totalTime = results.reduce((sum, value) => sum + value, 0);
        const totalRow = document.createElement('tr');
        const totalPromiseCell = document.createElement('td');
        const totalTimeCell = document.createElement('td');

        totalPromiseCell.textContent = 'Total';
        totalTimeCell.textContent = `${totalTime.toFixed(3)} seconds`;

        totalRow.appendChild(totalPromiseCell);
        totalRow.appendChild(totalTimeCell);
        document.getElementById('output').appendChild(totalRow);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });