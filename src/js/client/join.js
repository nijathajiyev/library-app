$(document).ready(function () {
    let alertMessage = $("#alertMessageJoin");
    let joinBtn = $("#modal-btn");
    let inputName = $("#inputName");
    let inputEmail = $("#inputEmail");


    joinBtn.on("click", function () {
        alertMessage.removeClass("d-none");
        let fullName = inputName.val();
        let email = inputEmail.val();
        if (!fullName || !email) {
            alertMessage.removeClass("alert-primary");
            alertMessage.addClass("alert-danger");
            alertMessage.html(` 
            <h2>Error</h2>
            <h1>Please check form</h1>`);
            return;
        }

        alertMessage.removeClass("alert-danger");
        alertMessage.addClass("alert-success");

        alertMessage.html(`
        <h2>Successful</h2>
        <h1>Welcome to the Library</h1>`);

        let dbJoin = db.ref("join");
    
        let form = {
            fullName,
            email
        }
    
        dbJoin.push().set(form);

        setTimeout(function(){
            window.location.reload();
        },3000);
    })
})