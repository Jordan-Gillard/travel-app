async function handleFormSubmit (event) {
    event.preventDefault();
    const location = document.getElementById('dest-input');
    const departureDate = document.getElementById('departure-date');
    const returnDate = document.getElementById('return-date');
    const data = {
        location: location.value,
        date: departureDate.value
    };

    console.log('Sending data to server: ', data);
    Client.insertDepartureDate(departureDate.value);
    Client.calculateDaysAway(departureDate.value, returnDate.value);


    const serverEndpoint = 'http://localhost:3001/post-trip-info'
    const response = await fetch(serverEndpoint, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    const serverResponse = await response.json()  // parses JSON response into native JavaScript objects
    Client.buildUi(serverResponse)
}

export { handleFormSubmit }
