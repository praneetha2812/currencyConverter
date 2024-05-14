var from;
var to;
populateFromOptions();
populateToOptions();

function searchFrom()
{
    var inputWord = document.getElementById("searchforFrom").value;
    var searchWord = inputWord.toUpperCase();
    var fromListCountries = document.getElementById("fromList");
    var listElements = fromListCountries.getElementsByTagName('li');
    for (i = 1; i < listElements.length; i++) {
        a = listElements[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().startsWith(searchWord)) {
            listElements[i].style.display = "";
        } else {
            listElements[i].style.display = "none";
        }
      }
}
function searchTo()
{
    var inputWord = document.getElementById("searchforTo").value;
    var searchWord = inputWord.toUpperCase();
    var fromListCountries = document.getElementById("toList");
    var listElements = fromListCountries.getElementsByTagName('li');
    for (i = 1; i < listElements.length; i++) {
        a = listElements[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().startsWith(searchWord) ) {
            listElements[i].style.display = "";
        } else {
            listElements[i].style.display = "none";
        }
      }
}

function populateFromOptions()
{
    fetch('output.json').
    then((response)=>response.json()).
    then((jsonData)=>
    {
        const ulElement1 = document.getElementById('fromList');
        jsonData.forEach(country => 
            {
                const liElement = document.createElement('li');
                const anchorElement = document.createElement('a');
                anchorElement.classList.add('dropdown-item');
                anchorElement.href = '#';
                anchorElement.id = country['currency_code'];
                anchorElement.textContent = country['country']+'- '+country['currency_code'];;
                liElement.appendChild(anchorElement);
                ulElement1.appendChild(liElement);
            });
            document.querySelectorAll('#fromList .dropdown-item').forEach(item => {
            item.addEventListener('click', event => 
            {
                document.getElementById('inputValue1').value = event.target.textContent;
                from = event.target.id;
                // console.log(event.target.id);
                $.get('https://openexchangerates.org/api/latest.json', 
                {app_id: 'bbb1fb49c98c40879eed6ee54d5e43f1'}, 
                function(data) 
                {
                    var amount = document.getElementById("inputAmount").value;
                    var inputToDollar = amount/data['rates'][from];
                    var dollarToOputput = inputToDollar* data['rates'][to];
                    var rounded  =  dollarToOputput.toFixed(2);
                    var result  = amount+' '+from+ ' = '+ rounded+' '+ to;
                    console.log(result);
                    document.getElementById("result").innerHTML = rounded == "NaN"?"" : result;
                });
            });
        });
    });
    
}

function populateToOptions() 
{
    fetch('output.json').
    then((response)=>response.json()).
    then((jsonData)=>
    {
        const ulElement1 = document.getElementById('toList');
        jsonData.forEach(country => 
            {
                const liElement = document.createElement('li');
                const anchorElement = document.createElement('a');
                anchorElement.classList.add('dropdown-item');
                anchorElement.href = '#';
                anchorElement.id = country['currency_code'];
                anchorElement.textContent = country['country']+'- '+country['currency_code'];
                liElement.appendChild(anchorElement);
                ulElement1.appendChild(liElement);
            });
            document.querySelectorAll('#toList .dropdown-item').forEach(item => {
            item.addEventListener('click', event => 
            {
                document.getElementById('inputValue2').value = event.target.textContent;
                to = event.target.id;
                $.get('https://openexchangerates.org/api/latest.json', 
                {app_id: 'bbb1fb49c98c40879eed6ee54d5e43f1'}, 
                function(data) 
                {
                    var amount = document.getElementById("inputAmount").value;
                    var inputToDollar = amount/data['rates'][from];
                    var dollarToOputput = inputToDollar* data['rates'][to];
                    var rounded  =  dollarToOputput.toFixed(2);
                    var result  = amount+' '+from+ ' = '+ rounded+' '+ to;
                    console.log(result);
                    document.getElementById("result").innerHTML = rounded == "NaN"?"" : result;
                });
            });
        });
    });
    
}

function calculate()
{
    $.get('https://openexchangerates.org/api/latest.json', 
    {app_id: 'bbb1fb49c98c40879eed6ee54d5e43f1'}, 
    function(data) 
    {
        var amount = document.getElementById("inputAmount").value;
        var inputToDollar = amount/data['rates'][from];
        var dollarToOputput = inputToDollar* data['rates'][to];
        var rounded  =  dollarToOputput.toFixed(2);
        var result  = amount+' '+from+ ' = '+ rounded+' '+ to;
        console.log(result);
        document.getElementById("result").innerHTML = rounded == "NaN"?"" : result;
    });
}