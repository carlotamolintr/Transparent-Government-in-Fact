// Datos para la tabla 1:

// the number of Democrats, Republicans and Independents (count).



// var allParty = [];
// var R = [];
// var I = [];
// var D = [];
// var all = [];



let myVue = new Vue({
    el: "#VueTable",
    data: {
        politics: dataHouse.results[0].members,
        R: [],
        D: [],
        I: [],


    },

    methods: {


        numeroPartidos() {

            console.log("dentro de if");

            this.politics.forEach(p => {
                if (p.party == "R") this.R.push(p);
                if (p.party == "D") this.D.push(p);
                if (p.party == "I") this.I.push(p);

            });

        },
        average(variable1) {
            percent = 0;



            for (let i = 0; i < variable1.length; i++) {

                percent = percent + (variable1[i].votes_with_party_pct) / variable1.length;

            }

            return percent;

        }
    },
    created() {
        console.log("dentro de created");
        this.numeroPartidos();
        this.average(this.R);
        this.average(this.I);
        this.average(this.D);





    },
})



//Hacerlo en JS:


// for (let i = 0; i < dataHouse.results[0].members.length; i++) {
//     allParty.push(dataHouse.results[0].members[i].party);

//     if (allParty[i].includes("I")) {
//         I.push(allParty[i]);

//     }
//     else if (allParty[i].includes("R")) {
//         R.push(allParty[i]);
//     }

//     else {
//         D.push(allParty[i]);
//     }

// }
// console.log(all);

// // % Voted w Party:


// var percentR = 0; // Asignamos un valor númerico a la variable.
// var percentD = 0;
// var percentI = 0;

// // Average de los porcentajes de cada partido: 

// for (let i = 0; i < dataHouse.results[0].members.length; i++) {

//     if (dataHouse.results[0].members[i].party.includes("R")) {
//         percentR = percentR + (dataHouse.results[0].members[i].votes_with_party_pct) / R.length;// percentR en la primera ronda del loop = 0 , en la segunda ronda acumulará el valor de "(dataHouse.results[0].members[i].votes_with_party_pct)/R.length" de la primera. Y así sucesivamente. 
//     }
//     else if (dataHouse.results[0].members[i].party.includes("D")) {
//         percentD = percentD + (dataHouse.results[0].members[i].votes_with_party_pct) / D.length;

//     }
//     else {
//         percentI = percentI + (dataHouse.results[0].members[i].votes_with_party_pct) / I.length;

//     }
// }

// console.log(percentD);
// console.log(percentI);
// console.log(percentR);






// // //------------Generar la tabla 1-----



// var firstTable = document.querySelector("#table1"); /*The Document method querySelector() returns the first Element within the document that matches*/


// var firstT = `
//         <table class="table">
//         <thead >
//         <tr>
//         <th>Party</th>
//         <th>Nº of Repres </th>
//         <th>% Voted w Party </th>
//         <tr>

//         <td>Democrats</td><td>${(D.length)}</td><td>${percentD.toFixed(2)}</td> 
//         </tr>

//         <td>Republicans</td><td>${(R.length)}</td><td>${percentR.toFixed(2)}</td>
//         </tr>

//         <td>Independents</td><td>${(I.length)}</td><td>${percentI.toFixed(2)}</td>
//         <td></td>
//         <tr>
//         <td>Total</td><td>${(D.length + R.length + I.length)}</td><td>${((percentD + percentR + percentI) / 3).toFixed(2)}</td>
//         <td></td>

//         </tr>`
// // Quito los decimales con la función toFixed(n)

// firstTable.innerHTML = firstT; /*innerHTML refers to the contents inside an HTML element*/





//------------------------- Generar tabla 2 y 3------------

// Datos para la tabla 2;



var secondTable = document.querySelector("#table2");
var thirdTable = document.querySelector("#table3");
var votes = [];
for (let i = 0; i < dataHouse.results[0].members.length; i++) {
    votes.push(dataHouse.results[0].members[i]);
}

votes.sort(function (a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1;
    }
    return 0;
});



// finalTOp es la parte final de mi array votes.


// 10% menos votados. Con el slice cojo los números del 0 al 10%.

let top10 = votes.slice(0, votes.length * 0.1);
let bottom10 = votes.reverse().slice(0, votes.length * 0.1);

var lastpart = votes.slice(votes.length * 0.1, votes.length) // trozo de la array que va del 10% hasta el final

// Necesitamos sacar también los nombres de la la gente si tienen la misma puntuación que el que está último en la lista del 10% para poderlos incluir también.
// votes es la array entera. Y esta array está partida en dos arrays Top10 y finalTop10.

for (let i = 0; i < lastpart.length; i++) {
    if (lastpart[i].votes_with_party_pct == top10[top10.length - 1].votes_with_party_pct) {
        top10.push(lastpart[i]);
    }
}

for (let i = 0; i < lastpart.length; i++) {
    if (lastpart[i].votes_with_party_pct == bottom10[bottom10.length - 1].votes_with_party_pct) {
        bottom10.push(lastpart[i]);
    }
}


















generatetable(secondTable, top10);
generatetable(thirdTable, bottom10);

function generatetable(donde, members) {


    var table = `
    <table class="table">
    <thead >
    <tr>
    <th>Full name</th>
    <th>Nº of Party Votes</th>
    <th>% Party Votes </th>
    </tr>
    </thead>
    <tbody>`;

    for (var i = 0; i < members.length; i++) {
        let rowHTML = `
    <tr>

    <td><a href="${members[i].url}">${members[i].first_name + " " + ((members[i].middle_name) || "") + " " + members[i].last_name}</a></td> 
   

    <td>${members[i].total_votes}</td>
    <td>${members[i].votes_with_party_pct}</td>
        </tr>`;
        table += rowHTML;
    }
    table += `</table></tbody>`


    donde.innerHTML = table; /*innerHTML refers to the contents inside an HTML element*/

}
