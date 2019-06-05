function nodata(element) {

    if (element == null) {
        return (" ");
    }
    else {
        return element
    }

}

var mydiv = document.querySelector("#divWithTable");

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

for (i = 0; i < dataHouse.results[0].members.length; i++) {
    const rowHTML = `
    <tr>

    <td><a href="${dataHouse.results[0].members[i].url}">${dataHouse.results[0].members[i].first_name + " " + nodata(dataHouse.results[0].members[i].middle_name) + " " + dataHouse.results[0].members[i].last_name}</a></td> 
    <td>${dataHouse.results[0].members[i].party}</td>
    <td>${dataHouse.results[0].members[i].state}</td>
    <td>${dataHouse.results[0].members[i].seniority}</td>
    <td>${dataHouse.results[0].members[i].votes_with_party_pct}</td>
        </tr>`;
    table += rowHTML;
}
table += `</tbody>`
table += `</table>`


mydiv.innerHTML = table;







document.getElementById("house-data").innerHTML = JSON.stringify(dataHouse.results[0].members, null, 2);
console.log(dataHouse);