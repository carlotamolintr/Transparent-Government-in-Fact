// Datos para la tabla 1:

// the number of Democrats, Republicans and Independents (count).



var allParty = [];
var R = [];
var I = [];
var D =[];
var all= [];

for(let i=0; i< dataSenate.results[0].members.length; i++){
    allParty.push(dataSenate.results[0].members[i].party);

        if (allParty[i].includes("I")){
            I.push(allParty[i]);

        }
        else if (allParty[i].includes("R")){
            R.push(allParty[i]);
        }

        else {
            D.push(allParty[i]);
        }

}
console.log(all);

// % Voted w Party:


var percentR = 0; // Asignamos un valor númerico a la variable.
var percentD = 0;
var percentI = 0;

// Average de los porcentajes de cada partido: 

for (let i=0; i< dataSenate.results[0].members.length;i++){

    if(dataSenate.results[0].members[i].party.includes("R")){
        percentR = percentR+(dataSenate.results[0].members[i].votes_with_party_pct)/R.length;// percentR en la primera ronda del loop = 0 , en la segunda ronda acumulará el valor de "(dataSenate.results[0].members[i].votes_with_party_pct)/R.length" de la primera. Y así sucesivamente. 
        }
    else if (dataSenate.results[0].members[i].party.includes("D")){
        percentD= percentD+(dataSenate.results[0].members[i].votes_with_party_pct)/D.length;
        
    }
    else {
        percentI = percentI+(dataSenate.results[0].members[i].votes_with_party_pct)/I.length;
        
    }
}

console.log(percentD);
console.log(percentI);
console.log(percentR);






//------------Generar la tabla 1-----



    var firstTable = document.querySelector("#table1"); /*The Document method querySelector() returns the first Element within the document that matches*/
    

    var firstT = `
        <table class="table">
        <thead >
        <tr>
        <th>Party</th>
        <th>Nº of Repres </th>
        <th>% Voted w Party </th>
        <tr>
    
        <td>Democrats</td><td>${(D.length)}</td><td>${percentD.toFixed(2)}</td> 
        </tr>
       
        <td>Republicans</td><td>${(R.length)}</td><td>${percentR.toFixed(2)}</td>
        </tr>
        
        <td>Independents</td><td>${(I.length)}</td><td>${percentI.toFixed(2)}</td>
        <td></td>
        <tr>
        <td>Total</td><td>${(D.length+R.length+I.length)}</td><td>${((percentD+percentR+percentI)/3).toFixed(2)}</td>
        <td></td>
    
        </tr>`
 // Quito los decimales con la función toFixed(n)

    firstTable.innerHTML = firstT; /*innerHTML refers to the contents inside an HTML element*/






// Datos para la tabla 2;


var missed = [];

for(let i=0; i<dataSenate.results[0].members.length; i++){
 missed.push(dataSenate.results[0].members[i]);

}



function compare (a, b) { // el sort Itera, comparando el primer indice con el segundo, el segundo con el tercero, y así succesivamente.
        if ( a.missed_votes < b.missed_votes ){
          return -1;
        }
        if ( a.missed_votes > b.missed_votes ){
          return 1;
        }
        return 0;
      }
      
      missed.sort(compare);


    console.log(missed);

var top10 = [];

 

top10 = missed.slice(0,missed.length*0.10); // 10% menos votados. Con el slice cojo los números del 0 al 10%.



var bottom10 = [];
bottom10 = missed.reverse().slice(0, missed.length*0.1); // 10% mas votados.

console.log(bottom10);






//------------------------- Generar tabla 2 y 3------------



var secondTable = document.querySelector("#table2"); /*The Document method querySelector() returns the first Element within the document that matches*/
var thirdTable = document.querySelector("#table3");

generatetable(secondTable, top10);
generatetable(thirdTable, bottom10);

function generatetable(donde, members){


    var table = `
    <table class="table">
    <thead >
    <tr>
    <th>Full name</th>
    <th>Nº of Missed Votes</th>
    <th>% Missed Votes </th>
    </tr>
    </thead>
    <tbody>`;

for (var i = 0; i < members.length; i++) {
    let rowHTML = `
    <tr>

    <td><a href="${members[i].url}">${members[i].first_name + " " + (members[i].middle_name) || "" + " " + members[i].last_name}</a></td> 
   

    <td>${members[i].missed_votes}</td>
    <td>${members[i].votes_with_party_pct}</td>
        </tr>`;
    table += rowHTML;
}
table += `</table></tbody>`


donde.innerHTML = table; /*innerHTML refers to the contents inside an HTML element*/

}


