$(document).ready(function () {
  var path = window.location.search.slice(1);

  // BackButton
  $(document).on("click", ".backBtn", () => {
    window.location.replace("../../catalog.html");
  });

  // GEt one book
  function getOneBookAbout() {
    db.ref(`/books/${path}`).on("value", async function (snap) {
      let data = snap.val();
      console.log(data.date);
      await $("#book-time .timeago").attr("datetime", data.date);
      jQuery("time.timeago").timeago();
      $("#book-year").html(data.bookYear);
      $("#author-name").html(data.bookAuthor);
      $("#book-header").html(data.bookDescription);
      $(".book-img img").attr("src", data.bookImage);
    });
  }

  getOneBookAbout();

  // getComments
  function getComments() {
    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "GET",
      success: function (response) {
        renderPage(response.reverse());
      },
      error: function () {
        "Xeta oldu";
      },
    });
  }

  getComments();

  function renderPage(data) {
    data.map(function (item) {
      let div = $("<div>").addClass("anonim1").html(`
           <div id="anonim1-head">
           <h4>anonim</h4>
           <h5 id="comment-time"><time class="timeago" datetime="${item.time}"></time></h5>
       </div>
       <p>${item.body}</p>
           `);
          //  $("#comment-time .timeago").attr("datetime", item.time);
           
       setTimeout(() => {
        jQuery("time.timeago").timeago();
        $(".comments").append(div);
      }, 2000);
    });
  }

  $(document).on("click", "#store-btn-img", () => {
    let comment = {
      body: $("#store-input").val(),
      time: moment().format("D MMM Y HH:mm"),
    };

    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "POST",
      data: comment,
      success:async function (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your comment has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
       await $(".comments").html("");
        await $("#store-input").val("");

        getComments();
      },
    });
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
});
