// Saco de internet un objeto que me relaciona las siglas de los estados con su nombre completo


//--------------- Cargar los datos del api-----------------

let dataSenate;

// tengo que generar mi variable para el fetch


getData();



async function getData() {

    var myApi = {
        headers: ({
            'X-API-Key': '6t6gVJAF4QLWDZFDyRumlsNAA9udfjvQtouMvr2R'
        }),
    };

    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"

    let response = await fetch(url, myApi);
    let dataFinal = await response.json();

    dataSenate = dataFinal;
    fillStates();
    generateTable(dataSenate.results[0].members);


    fetch(url, myApi)
        .then(function (response) {
            return response.json()
        })

        .then(function (dataFinal) {
            dataSenate = dataFinal;
            console.log(dataFinal);
            fillStates();
            generateTable(dataSenate.results[0].members);

        })

    // .catch(function(error){
    //     console.log(error)
    // })


}



//-------------------Creación de los filtros--------------------
function fillStates() {
    var fullStates = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }

    var states = document.querySelector("#selector"); /*The Document method querySelector() returns the first Element within the document that matches*/

    console.log(states);


    // let newlList = Array.from(new Set(rutajson.map(function (member) { return member.state }).sort()));
    //var rutajson = datasenate.results[0].members;
    // Obtenemos un array con el valor de los estados 

    var lista = [];

    for (let i = 0; i < dataSenate.results[0].members.length; i++) {
        lista.push(dataSenate.results[0].members[i].state)
    }
    console.log(lista);

    // Quitar las opciones que salen duplicadas y las ordenamos:

    newList = [];

    for (var i = 0; i < lista.length; i++) {
        for (var j = 0; j < lista.length; j++) {
            if (lista[i] !== lista[j] && i !== j && !newList.includes(lista[i])) {
                newList.push(lista[i]);
            }

        }
    }
    console.log(newList);
    newList.sort();
    console.log(newList);




    for (let i = 0; i < newList.length; i++) {
        let option = document.createElement("option"); // creamos las tags options
        option.setAttribute("value", newList[i]); // Atribuimos un value (value=" ") que viene dado por la newlist
        option.innerHTML = fullStates[newList[i]]; // fullStates es un objeto que 
        states.append(option);
    }



}

// states.innerHTML = newList; Sustituye el contenido que hay dentro de la tag


// Para que los valores nulos de la tabla se supriman:
function nodata(element) {

    if (element == null) {
        return (" ");
    }
    else {
        return element
    }

}

/* función: crea una array a partir de los input checked*/
function input() {

    var valores = document.getElementById("selector").value; // añadimos los valores de los estados
    console.log(valores);


    var input = document.querySelectorAll("input[type='checkbox']:checked");
    var arrayResult = []; /* creo una nueva array para meter los objetos de input en cada posición de un nuevo array*/
    var filterArray = [];


    for (let i = 0; i < input.length; i++) { /*loop para introducir los objetos que hay en la variable input en una nueva array*/
        arrayResult[i] = input[i].value;
        console.log(arrayResult); // Muestra la array creada
    }


    for (let i = 0; i < dataSenate.results[0].members.length; i++) {
        if ((arrayResult.includes(dataSenate.results[0].members[i].party) || arrayResult.length == 0)
            && (dataSenate.results[0].members[i].state == valores || valores == 'All')) {
            filterArray.push(dataSenate.results[0].members[i]);



        }
    }
    generateTable(filterArray); // Genero la tabla con el filtro aplicado


}


//------------------------------------- Creación de la tabla

function generateTable(members) {

    var mydiv = document.querySelector("#divWithTable"); /*The Document method querySelector() returns the first Element within the document that matches*/

    var table = `
        <table class="table">
        <thead >
        <tr>
        <th>Full name</th>
        <th>Party </th>
        <th>State </th>
        <th>Years in Office </th>
        <th>% Votes w/ Party </th>
        </tr>
        </thead>
        <tbody>`;

    for (var i = 0; i < members.length; i++) {
        let rowHTML = `
        <tr>
    
        <td><a href="${members[i].url}">${members[i].first_name + " " + nodata(members[i].middle_name) + " " + members[i].last_name}</a></td> 
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
            </tr>`;
        table += rowHTML;
    }
    table += `</tbody>`
    table += `</table>`


    mydiv.innerHTML = table; /*innerHTML refers to the contents inside an HTML element*/
}


//generateTable(dataSenate.results[0].members); // Primero al cargar la página se genera la tabla con todos los datos.
