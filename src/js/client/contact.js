$(document).ready(function(){

    let contact = $("#contact-btn");
    let alertMessage = $("#alertMessage");
    let dbContact = db.ref("Contact");

    contact.on("click",function(){

        let fullName = $("#input-fullName").val();
        let address = $("#input-address").val();
        let  email = $("#input-email").val();
        let phone = $("#input-phone").val();

        alertMessage.removeClass("d-none");
        if(!fullName||!email||!address||!phone){
            alertMessage.removeClass("alert-primary");
            alertMessage.addClass("alert-danger");
            alertMessage.html(`
                    <strong>Error </strong>
                    <h4>Fields can't be empty</h4>`);
            return;
        }

        alertMessage.removeClass("alert-danger");
        alertMessage.addClass("alert-success");

        alertMessage.html(`
        <strong>Successful </strong>
        <h4>Information sent succesfully</h4>`);

        $("#input-fullName").val("");
        $("#input-address").val("");
        $("#input-email").val("");
        $("#input-phone").val("");


        let form = {
            fullName,
            address,
            email,
            phone
        }

        dbContact.push().set(form);

    })
    if (window.matchMedia("(max-width: 320px)").matches) {
        $(".list-1").hide();
        $(".list-2").hide();
        $(".list-3").hide();
        $(".footer-2").show();
        $("#last-text").hide();
        $("#footer-text2").show();
        $(".footer-num").hide();
    } else {
        $(".list-1").show();
        $(".list-2").show();
        $(".list-3").show();
        $(".footer-2").hide();
        $("#last-text").show()
        $("#footer-text2").hide();
        $(".footer-num").show();
      }

})