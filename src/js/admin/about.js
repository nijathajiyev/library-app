$(document).ready(function(){

    let aboutBtn = $("#info-btn");

    aboutBtn.on("click",function(){
        let title = $("#store-inp1").val();
        let book_Image_Url = $("#store-inp2").val();
        let description = $("#store-textarea").val();

        if(!title || !book_Image_Url || !description){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            return;
        }

        let form = {
            title,
            book_Image_Url,
            description
        }

        console.log(form);

        let dbAbout = db.ref("about");

        dbAbout.set(form);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

    })
})