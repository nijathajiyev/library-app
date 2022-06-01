$(document).ready(function () {
    let dbJoin = db.ref("join");
    let table = $(".tbl-b2");

    dbJoin.on("value", function (data) {
        let newData = Object.entries(data.val()).map(items => {
            return {
                id: items[0],
                ...items[1]
            }
        });

        table.html(newData.map((item,index) => {
            return (`
            <tr>
            <th scope="row">${index+1}</th>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
        </tr>
           `)
        }).join(""))

    })
})