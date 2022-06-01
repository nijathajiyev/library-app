$(() => {

  let formName = $("#name");
  let formAuthor = $("#author");
  let formImage = $("#image");
  let formDescription = $("#description");
  let formDate = $("#date");

  $(".addCategoySection").hide();
  $(".loading").hide();
  $(".apiBooks").hide();
  if (localStorage.getItem("user")) {
    $(".adminPanel").hide();
    $("#bookSearchPage").show();
  } else {
    $(".adminPanel").show();
    $("#bookSearchPage").hide();
  }

  // Login
  $(".loginBtn").on("click", function (e) {
    e.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let wrongInput = "";

    if (username.trim() === "") {
      wrongInput = "Username";
    } else if (password.trim() === "") {
      wrongInput = "Password";
    } else if (username.trim() === "" && password.trim() === "") {
      wrongInput = "Username and Password";
    } else {
      let myObj = {};
      myObj.username = $("#username").val();
      myObj.password = $("#password").val();
      loginValidator(myObj);
      return;
    }

    Swal.fire({
      icon: "error",
      title: `${wrongInput} cannot be empty`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  });

  // Login Validator
  function loginValidator(data) {
    db.ref("/login").on("value", function (snap) {
      let user = snap.val();

      if (data.username === user.username && data.password === user.password) {
        $(".adminPanel").hide();
        $("#bookSearchPage").show();
        localStorage.setItem("user", data.username);
      } else {
        Swal.fire({
          icon: "error",
          title: "Username və ya şifrə yanlışdır",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        return false;
      }
    });
  }

  // Logout
  $(document).on('click', ".logOut", function () {
    localStorage.removeItem("user");
    window.location.reload();
  })
  // Search
  $(document).on("click", "#searchBtn", function () {
    $(".loading").show();
    $(".apiBooksList").html("");
    $(".apiBooks").show();
    let newArr = [];

    let searchValue = $(".searchInput input[type=search]").val();
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`,
      method: "GET",
    };

    $.ajax(settings).done(function (response) {
      if (response.items) {
        $(".loading").hide();
        if (response.items.length > 5) {
          $(".apiBooksList").css({
            overflow: "auto"
          });
        }
        response.items.map((item) => newArr.push(item.volumeInfo));
        renderPage(newArr);
      } else if (response.items === undefined) {
        $(".loading").hide();
        $(".apiBooksList").css({
          overflow: "hidden"
        });
        $(".apiBooks").css({
          height: "auto"
        });
        $(".apiBooksList").html(`
          <div class="text-danger p-2 text-center h4"><p>No result</p></div>
          `);
      }
    });
  });

  // Search li click
  function getBookForm(item) {
    let obj = {};
    obj.title = item.title;
    obj.authors = item.authors;
    obj.imageUrl = item.imageLinks.thumbnail;
    obj.description = item.description;
    obj.formDate = item.publishedDate;

    showForm(obj);
  }

  // after click form val binding
  function showForm(obj) {
    let imageUrl = obj.imageUrl ? obj.imageUrl : "../../img/9pqc09dl-900.jpg";
    let description = obj.description ?
      obj.description :
      "Məlumat yoxdu zəhmət olmasa daxil edin";

    formName.val(obj.title);
    formAuthor.val(obj.title);
    formImage.val(imageUrl);
    formDescription.val(description);
    formDate.val(obj.formDate);
    $("#descriptionCount").html(`${obj.description.length}/1000`)
  }
  // Form renderpage
  function renderPage(data) {
    console.log(data);
    for (const item of data) {
      let img = item.imageLinks ?
        item.imageLinks.thumbnail :
        "../../img/9pqc09dl-900.jpg";
      let li = $("<li>").html(`
          <img src="${img}" alt="">
          <p class="apiBooksListItem">${item.title}</p>
          <p class="authors">(${item.authors})</p>
          `);
      $(".apiBooksList").append(li);
      li.on("click", function () {
        $(".apiBooks").hide();
        getBookForm(item);
      });
    }
  }

  // addCategoryIcon click open addCategoySection
  $(document).on("click", ".addCategoryIcon", () => {
    $(".addCategoySection").toggle(1000);
  });

  //addForm description text count
  $(document).on("keydown", "#description", (e) => {
    let count = e.target.value.length;
    $("#descriptionCount").html(`${count}/1000`);
    if (count === 1000) {
      $("#descriptionCount").css({
        color: "red"
      });
    } else {
      $("#descriptionCount").css({
        color: "black"
      });
    }
  });

  // .addCategoryBtn with .addCategoySection value join firebase category

  $(document).on("click", ".addCategoryBtn", () => {
    let value = $(".addCategoySection input").val();
    if (value === "") {
      $(".addCategoySection input").addClass("is-invalid");
    } else {
      $(".addCategoySection input").removeClass("is-invalid");
      db.ref("/category").push().set({
        category: value
      });
      $(".addCategoySection input").val("");
      $(".addCategoySection").hide(2000);
    }
  });

  // firebase category on #my-select
  function getCategory() {
    db.ref("/category").on("value", (snap) => {
      let data = Object.values(snap.val());
      for (const item of data) {
        let option = $("<option>").html(item.category).val(item.category);
        $("#my-select").append(option);
      }
    });
  }
  getCategory();

  // addBookFirabase finally
  async function addBookFirabase() {
    let formNew = $("#defaultCheck1").is(":checked");

    if (formNew) {
      $("#my-select").val("New");
    }

    let selectOption = $("#my-select").val();

    if (
      formName.val() === "" ||
      formAuthor.val() === "" ||
      formImage.val() === "" ||
      formDescription.val() === "" ||
      selectOption === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    } else {
      await db.ref("/books").push().set({
        bookName: formName.val(),
        bookAuthor: formAuthor.val(),
        bookImage: formImage.val(),
        bookYear: formDate.val(),
        bookDescription: formDescription.val(),
        bookCategory: selectOption,
        date: moment().format("D MMM Y HH:mm")
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Məlumat uğurla əlavə edildi",
        showConfirmButton: false,
        timer: 1500,
      });

      formName.val("")
      formAuthor.val("")
      formImage.val("")
      formDescription.val("")
      $("#my-select").val("")
    }
  }
  $(document).on("click", "#addBookFirabase", addBookFirabase);

  if (window.matchMedia("(max-width: 320px)").matches) {
    $(".icon-main").show();
  } else {
    $(".icon-main").hide();
  }
});