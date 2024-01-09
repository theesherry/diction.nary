 document.getElementById('input').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    searchWord();
                }
            })
function searchWord() {
            // Get the user input
            const userInput = document.getElementById('input').value;

            // Fetch data from the Dictionary API based on user input
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
                .then(response => {
                    // Check if the response status is OK (200)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Parse the JSON response
                    return response.json();
                })
                .then(data => {
                    // Access the element where you want to display the data
                    const outputElement = document.getElementById('word');

                    // Check if the data array is not empty
                    if (Array.isArray(data) && data.length > 0) {
                        // Update the HTML content with the data
                        outputElement.innerHTML = `
                             <p class="pos" id="pos"> ${data[0].word} </p>
                            <p class="meaning"> ${data[0].meanings[0].definitions[0].definition}</p>
                           <p class="example"> ${data[0].meanings[0].partOfSpeech}</p>
                        `;
                    } else {
                        // Handle the case where no data is returned
                        outputElement.innerHTML = '<p>No data available</p>';
                    }
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching data:', error);
                    outputElement.innerHTML='<p>error</p>' 
                });
        };
    