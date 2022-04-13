$(document).ready(function () {
    $('body').on('click', '.capture-print', function () {

        $('.tags').hide();
        $('#test-pencere').hide();
        $('#kunye').hide();
        $('#books-content').hide();
        $('#facebook-content-area').hide();

        Swal.fire({
            title: '',
            html: '<div class="alert alert-success" role="alert">\n' +
                ' <strong>Lütfen Bekleyiniz... İşleminiz Yapılıyor. </strong>\n' +
                '</div>',
            timer: 6000,
            timerProgressBar: true,
            didOpen: () => {

                html2canvas(document.querySelector("#" + CONTENT_ELEMENT)).then(canvas => {
                    $("#" + CONTENT_ELEMENT).hide();
                    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
                    var div_id = CAPTURE_SET_AREA_ID;
                    var img = document.createElement("img");
                    img.src = dataURL;

                    $('#' + div_id).html(img);
                    PrintElem('#' + div_id);

                });
            },
            willClose: () => {
                $('#test-pencere').delay(2000).fadeIn(8000);
                $('#kunye').delay(2000).fadeIn(8000);
                $('#books-content').delay(2000).fadeIn(8000);
                $('#facebook-content-area').delay(2000).fadeIn(8000);

            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })


    });

    $('body').on('click', '.capture-get-url', function () {
        let action = $(this).data('action');
        let STUDENT = $(this).data('student');
        var img = document.createElement("img");
        var audio = new GlobalAudio('iphone-camera-capture.mp3');
        $('.tags').hide();
        $('#test-pencere').hide();
        $('#kunye').hide();
        $('#books-content').hide();
        $('#facebook-content-area').hide();
        Swal.fire({
            title: '',
            html: '<div class="alert alert-success" role="alert">\n' +
                ' <strong>Lütfen Bekleyiniz... İşleminiz Yapılıyor. </strong>\n' +
                '</div>',
            timer: 6000,
            timerProgressBar: true,
            didOpen: () => {

                audio.play();
                html2canvas(document.querySelector("#" + CONTENT_ELEMENT)).then(canvas => {
                    // $("#" + CONTENT_ELEMENT).hide();

                    var dataURL = canvas.toDataURL("image/jpeg", 1.0);

                    img.src = dataURL;
                    var splitted = dataURL.split('base64,');

                    $.ajax({
                        type: "POST",
                        url: 'https://api.imgbb.com/1/upload?expiration=600&key=043b3184868fc15565f4c7a980d502a5&name=' + STUDENT,
                        data: {
                            image: splitted[1]
                        },
                        success: function (result) {
                            let data_url = result.data.url;
                            var SocialShare = new SocialMedia(action, STUDENT + ' Ekran Görüntüsünü Aşağıda Görebilirsiniz.', data_url);
                            SocialShare.share();
                        },
                        dataType: 'json'
                    });

                });
            },
            willClose: () => {
                $('#test-pencere').delay(2000).fadeIn(8000);
                $('#kunye').delay(2000).fadeIn(8000);
                $('#books-content').delay(2000).fadeIn(8000);
                $('#facebook-content-area').delay(2000).fadeIn(8000);

            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })


    });
});


function PrintElem(elem) {
    var audio = new GlobalAudio('iphone-camera-capture.mp3');
    audio.play();
    $(elem).show();
    $(elem).printThis({
        beforePrintEvent: function () {
            $(elem).hide();
            $("#" + CONTENT_ELEMENT).show();
            $(".tags").show();
        },

        header: COPYRIGHT,
        footer: COPYRIGHT,
    });
}

function runSocialOnlyText(action) {
    html2canvas(
        {backgroundColor: null},
        document.querySelector("#" + CONTENT_ELEMENT)).then(canvas => {
        var audio = new GlobalAudio('iphone-camera-capture.mp3');
        audio.play();
        var dataURL = canvas.toDataURL("image/jpeg", 1.0);
        var splitted = dataURL.split('base64,');

        $.ajax({
            type: "POST",
            url: 'https://api.imgbb.com/1/upload?expiration=600&key=043b3184868fc15565f4c7a980d502a5&name=' + STUDENT,
            data: {
                image: splitted[1]
            },
            success: function (result) {

                var SocialShare = new SocialMedia(action, STUDENT + ' Karnesini aşağıdaki linkten görebilirsiniz.', STUDENT + ' Karnesi', result.data.url);
                SocialShare.share();
            },
            dataType: 'json'
        });


    });
}