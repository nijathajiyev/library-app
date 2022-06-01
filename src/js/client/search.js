$(document).ready(function () {
  $("#searchSlider").hide();
  $("#searchOne").hide();

  $(".owl-carousel2").owlCarousel({
    autoplay: true,
    autoplayTimeout: 2000,
    loop: true,
    // margin: 30,
    nav: true,
    navText: ["<img src='./src/img/prev.svg'>","<img src='./src/img/next.svg'>"],
    responsive: {
      0: {
        items: 1,
      },
      577: {
        items: 1,
      },
      1100: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  function getSearchBook() {
  
    let arr = [];
    let inputValue = $("#search-input").val().toLowerCase();
    localStorage.setItem("searcBook", inputValue);
    if (inputValue === "") {
      $("#search-input").addClass("is-invalid");
    } else {
      $("#search-input").removeClass("is-invalid");
      db.ref("/books").on("value", function (snap) {
        let val = Object.values(snap.val());
        val.map(function (item) {
          if (item.bookName.toLowerCase().includes(inputValue)) {
            arr.push(item);
          }
        });
        renderPage(arr);
        return
      });
    }
  }

//   get search book from strage
function getSearchBookStorage(){ 
    let arr = [];
    if ("searcBook" in localStorage) {
        let localValue = localStorage.getItem("searcBook")
        db.ref("/books").on("value",function (snap){
            let val = Object.values(snap.val());
            val.map(function (item) {
              if (item.bookName.toLowerCase().includes(localValue)) {
                arr.push(item);
              }
            });
            renderPage(arr)
        })
    } 
}

getSearchBookStorage()

  async function renderPage(data) {
    if (data.length === 0) {
      return   Swal.fire({
        icon:"warning",
        title:"Warning",
        text:"No results found for your search"
      })
    } else if (data.length === 1) {
      for (let i = 0; i < $("#searchSlider .owl-item").length; i++) {
        $("#searchSlider").trigger("remove.owl.carousel",[i])
        .trigger("refresh.owl.carousel");
      }
      await $("#searchSlider").hide();
      await $("#searchOne").show();
      data.map(function (item) {
        $(".searchBookImg img").attr("src", item.bookImage);
        $(".searchBookText h3").html(item.bookName);
        $(".searchBookText small").html(item.bookAuthor);
        $(".searchBookText p").html(item.bookDescription);
      });
      return;
    } else {
      $("#searchOne").hide();
      await $("#searchSlider").show();
      data.map(function (item) {
        let div = $("<div>").addClass("searchBookData").html(`
                <div class="searchBookImg">
                <img src="${item.bookImage}" alt="">
            </div>
           
            <div class="searchBookText">
                <h3>${item.bookName.substring(0,80)}</h3>
                <small>${item.bookAuthor}</small>
            
                <p>${item.bookDescription.substring(0, 300)}</p>
            </div>
                `);

        $("#searchSlider").trigger("add.owl.carousel", div);
      });
      return
    }
  }

  $(document).on("click", "#btnSearch", getSearchBook);


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
});
