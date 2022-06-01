$(document).ready(function () {
  $(".owl-carousel1").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 30,
    nav: true,
    navText: ["<img src='./src/img/prev.svg'>","<img src='./src/img/next.svg'>"],
    responsive: {
      0: {
        items: 1,
      },
      577: {
        items: 2,
      },
      1100: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
  
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

  //get Category from firebase
  function getCategory() {
    db.ref("/category").on("value", function (snap) {
      let div ;
      let arr = Object.values(snap.val());
      arr.map(function (item) {
       if (localStorage.getItem("category") === item.category) {
         $("#allGetBooks").removeClass("activeCategory");
         div = $("<div>").addClass("categoryList-item activeCategory").html(`
        ${item.category}
        `);
       }
       else{
         div = $("<div>").addClass("categoryList-item").html(`
        ${item.category}
        `);
       }
        $(".categoryList").append(div);
        //category write localStorage
        div.on("click", function () {
          $(this).addClass("activeCategory");
          $(".categoryList-item").not(this).removeClass("activeCategory");
          for (let i = 0; i < $("#clickCategoryGetBooks .owl-item").length; i++) {
            $("#clickCategoryGetBooks").trigger("remove.owl.carousel",[i])
            .trigger("refresh.owl.carousel");
          }
          $("#booksLoading").show();
          $("#clickCategoryGetBooks").hide()
          localStorage.setItem("category", item.category);
          setTimeout(() => {
            getAllBooks();
          }, 1000);
          
        });
        
      });
      
    });
  }
  getCategory();

  function getAllBooks() {
    db.ref("/books").on("value", function (snap) {
      let arr = Object.entries(snap.val());
      arr.filter(function (item) {
        if (localStorage.getItem("category")) {
          if (item[1].bookCategory === localStorage.getItem("category")) {
            renderPage(item);
            return;
          }
        } else {
          renderPage(item);
          return;
        }
      });
    });
  }

  getAllBooks();

// allBtnGetBooks
 $(document).on("click", "#allGetBooks", function (){
  $(".categoryList-item").removeClass("activeCategory")
   $("#allGetBooks").addClass("activeCategory")
   localStorage.removeItem("category")
   $("#booksLoading").show();
   $("#clickCategoryGetBooks").hide()
   setTimeout(() => {
    getAllBooks();
   }, 1000);
 })

  function renderPage(item) {
    if (item) {
      
      $("#booksLoading").hide();
      $("#clickCategoryGetBooks").show()
      let bookImage = item[1].bookImage
        ? item[1].bookImage
        : "https://www.iconattitude.com/icons/open_icon_library/oxygen-style/png/256/x-office-address-book.png";
   
        if (item[1].bookCategory === "New") {
          $("#clickCategoryGetBooks").trigger(
            "add.owl.carousel",
            `
          <div class="card card-item">
          <span class="newBook">New</span>
          <img class="card-img-top" src="${bookImage}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${item[1].bookAuthor.substring(0, 15)}</h5>
            <a href="book-about.html?${item[0]}" class="btn btn-primary">READ MORE</a>
          </div>
          </div>
          `
          );
        }
        else {
          $("#clickCategoryGetBooks").trigger(
            "add.owl.carousel",
            `
          <div class="card card-item">
          <img class="card-img-top" src="${bookImage}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${item[1].bookAuthor.substring(0, 15)}</h5>
            <a href="book-about.html?${item[0]}" class="btn btn-primary">READ MORE</a>
          </div>
          </div>
          `
          );
        }
     
    }
    
  }

  // getBestellerCategory

  function getBestellerCategory() {
    db.ref("/books").on("value", function (snap) {
      let arr = Object.entries(snap.val());
      arr.map(function (item) {
     
        if (item[1].bookCategory === "Besteller") {
          let bookImage = item[1].bookImage
        ? item[1].bookImage
        : "https://www.iconattitude.com/icons/open_icon_library/oxygen-style/png/256/x-office-address-book.png";

          $("#bestellerCategory").trigger(
            "add.owl.carousel",
            `
          <div class="card card-item">
          <img class="card-img-top" src="${bookImage}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${item[1].bookAuthor.substring(0, 15)}</h5>
            <a href="book-about.html?${item[0]}" class="btn btn-primary">READ MORE</a>
          </div>
          </div>
          `
          );
        }
      });
    });
  }

  // get newCategory
  function getNewCategory(){
    db.ref("/books").on("value", function (snap) {
      let arr = Object.entries(snap.val());
      arr.map(function (item) {
        if (item[1].bookCategory === "New") {
          let bookImage = item[1].bookImage
          ? item[1].bookImage
          : "https://www.iconattitude.com/icons/open_icon_library/oxygen-style/png/256/x-office-address-book.png";
          $("#newCategory").trigger(
            "add.owl.carousel",
            `
          <div class="card card-item">
          <span class="newBook">New</span>
          <img class="card-img-top" src="${bookImage}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${item[1].bookAuthor.substring(0, 15)}</h5>
            <a href="book-about.html?${item[0]}" class="btn btn-primary">READ MORE</a>
          </div>
          </div>
          `
          );
        }
      });
    });
  }

  getBestellerCategory();
  getNewCategory();
});
