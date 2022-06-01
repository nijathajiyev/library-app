$(document).ready(function () {
    $("#about-imgs").show();
    let about = db.ref("about");

    about.on("value", function (data) {
        let newData = data.val();
        $("#store-about").html(newData.title)
        $("#about-text").html(newData.description)
        setTimeout(function(){
            $("#about-imgs").attr("src", newData.book_Image_Url);
            $("#about-imgs").css({ 
                width :"100%",
                height :"100%",
            })
        },1000)
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