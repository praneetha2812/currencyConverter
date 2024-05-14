
function modifyCountryJson()
{
    var list = [];

    // Define a function to make the AJAX request
    function fetchExchangeRates() {
        return new Promise(function(resolve, reject) {
            $.get('https://openexchangerates.org/api/latest.json', {app_id: 'bbb1fb49c98c40879eed6ee54d5e43f1'})
                .done(function(data) {
                    resolve(Object.keys(data['rates']));
                })
                .fail(function(error) {
                    reject(error);
                });
        });
    }

// Call the function and handle the returned promise
    fetchExchangeRates()
    .then(function(keys) {
        list = keys;
        console.log(list); // You can access the populated list here
    })
    .catch(function(error) {
        console.error('Error fetching exchange rates:', error);
    });

    fetch('output.json').
    then((response)=>response.json()).
    then(
        (json)=>
        {
            console.log(json.length);
            for(var i = 0 ;i<json.length;i++)
            {
                if(! (list.indexOf(json[i]['currency_code']) >-1))
                {
                    delete json[i];
                    console.log("deleted"+i);
                }
            }
            // Define the JSON data

        console.log(json);
        // Convert JSON data to string
        const jsonString = JSON.stringify(json, null, 2); // null and 2 for indentation

        // Create a Blob object from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'output.json';

        // Append the link to the document body
        document.body.appendChild(link);

        // Click the link programmatically to trigger the download
        link.click();

        // Cleanup: remove the link and revoke the URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        });
}