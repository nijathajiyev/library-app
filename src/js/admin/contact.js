$(document).ready(function () {
    let contact = db.ref("Contact");

    contact.on("value", function (data) {
        let newData = Object.entries(data.val()).map(item=>{
            return{
                id: item[0],
                ...item[1]
            }
        });

        $(".tbl-b").html(newData.map((item,index)=>{
            return `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.fullName}</td>
                <td>${item.address}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
            </tr>
            `
        }).join(""))
    })
})