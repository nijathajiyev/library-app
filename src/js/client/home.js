$(document).ready(function(){
    let catagoryDB = db.ref("category");

    catagoryDB.on("value",function(data){
        let newData = Object.entries(data.val()).map(item=>{
            return{
                id:item[0],
                ...item[1]
            }
        })
        $(".catalog-cards").html(newData.map(item=>{
            
            return `
            <div class="card col-md-3 shadow m-4 py-4 home-card"><a href="catalog.html" class="homeFromCatalog">${item.category}</a></div>
            `
        }))
    })

    $(document).on("click", ".homeFromCatalog",function(){
        localStorage.setItem("category",$(this).text())
    })

    if (window.matchMedia("(max-width: 320px)").matches) {
        $(".list-1").hide();
        $(".list-2").hide();
        $(".list-3").hide();
        $(".footer-2").show();
        $("#last-text").hide();
        $("#footer-text2").show();
    } else {
        $(".list-1").show();
        $(".list-2").show();
        $(".list-3").show();
        $(".footer-2").hide();
        $("#last-text").show()
        $("#footer-text2").hide();
      }

})