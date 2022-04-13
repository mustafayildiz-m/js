var keycode = "";

jQuery(document).bind("keyup keydown", function (event) {
    keycode = event.keyCode;
});

//sağ click ile sıfırlanıyor

//        menü start
var menu = document.querySelector('.menu');

var cmd_button = 91;
var ctrl_button = 17;

function showMenu(x, y) {

    if (keycode != ctrl_button && keycode != cmd_button && !keycode) {
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.add('show-menu');
    }
}

function hideMenu() {
    menu.classList.remove('show-menu');
}

function onContextMenu(e) {
    let session_id = 'CD__selection-' + CONTENT_ID;
    let sessionInfo = sessionStorage.getItem(session_id);
    let sessionButton = $('#reset-session');
    let shareSelectedButton = $('#share-selected');
    let copySelectedButton = $('#copy-selected');
    if (sessionInfo === null) {
        sessionButton.addClass('disabled');
        copySelectedButton.addClass('disabled');
        shareSelectedButton.addClass('disabled');
    }

    let id = '#' + CONTENT_ID;

    var x = (e.pageX - $(id).offset().left) + $(window).scrollLeft();
    var y = (e.pageY - $(id).offset().top) + $(window).scrollTop();


    if (x > 0 && y > 0) {

        $('.show-menu').show();
        if (keycode !== ctrl_button && keycode != cmd_button && !keycode) {
            e.preventDefault();

        } else {
            e.stopPropagation();
        }
        showMenu(e.pageX, e.pageY);
        document.addEventListener('click', onClick, false);

    } else {
        $('.show-menu').hide();

        e.stopPropagation();

    }


}

function onClick(e) {

    keycode = "";
    hideMenu();
    document.removeEventListener('click', onClick);
}

document.addEventListener('contextmenu', onContextMenu, false);


// Menü finish
//var collected_text = '';
//copy selected text from session storage
$(function () {

    let session_id = 'CD__selection-' + CONTENT_ID;
    let sessionInfo = sessionStorage.getItem(session_id);
    let sessionButton = $('#reset-session');
    let shareSelectedButton = $('#share-selected');
    let copySelectedButton = $('#copy-selected');
    if (sessionInfo === null) {
        sessionButton.addClass('disabled');
        copySelectedButton.addClass('disabled');
        shareSelectedButton.addClass('disabled');
    } else {
        sessionButton.removeClass('disabled');
        copySelectedButton.removeClass('disabled');
        shareSelectedButton.removeClass('disabled');

    }


    sessionStorage.removeItem('items');
    var highlightselect = $('.highlighted');


//seçilenleri sıfırlama
    resetSelected = (selectedId) => {
        var styleObject = $('.highlighted');

        if (sessionStorage.getItem(selectedId) !== null) {
            sessionStorage.removeItem(selectedId);
            styleObject.removeClass('highlighted');
            $.confirm({
                icon: 'fa fa-success',
                theme: 'modern',
                animationBounce: 2,
                columnclass: 'col-md-12 col-md-offset-2',
                title: 'İşlem Başarılı',
                content: '<h5><strong>Seçilen Metin Sıfırlandı</strong> </h5>',
                btnClass: 'btn-success',
                typeAnimated: true,
                buttons: {
                    ok: {
                        text: 'Tamam',
                        btnClass: 'btn-success',

                    },
                }
            });


            sessionButton.addClass('disabled');
        } else {
            return sessionButton.addClass('disabled');
        }


    }
    var collected_text = '';
    var last_added_words = '';
    var all_words = '';

    selectedCopy = function () {

        highlightselect.each(function () {
            collected_text += "\n " + $(this).html();
        });

        last_added_words = JSON.stringify(sessionStorage.getItem('items'));

        all_words = collected_text + last_added_words;


        navigator.clipboard.writeText(all_words)
            .then(function () {
                $.confirm({
                    icon: 'fa fa-success',
                    theme: 'modern',
                    animationBounce: 2,
                    columnclass: 'col-md-12 col-md-offset-2',
                    title: 'Kopyalama Başarılı',
                    content: '<h5><strong></strong> </h5>',
                    btnClass: 'btn-success',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Tamam',
                            btnClass: 'btn-success',

                        },
                    }
                });

            }, function (err) {
                $.confirm({
                    icon: 'fa fa-warning',
                    theme: 'modern',
                    animationBounce: 2,
                    columnclass: 'col-md-12 col-md-offset-2',
                    title: 'Kopyalama Hatası',
                    content: '<h5><strong></strong> </h5>',
                    btnClass: 'btn-warning',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Tamam',
                            btnClass: 'btn-success',

                        },
                    }
                });
            });


    }

    redirectPage = (action, baslik, url) => {
        highlightselect.each(function () {
            collected_text += "\n " + $(this).html();
        });
        last_added_words = JSON.stringify(sessionStorage.getItem('items'));
        all_words = collected_text + last_added_words;

        let encoded_url = encodeURIComponent(url);
        let encoded_words = encodeURIComponent(all_words);
        let encoded_title = encodeURIComponent(baslik);


        switch (action) {
            case 'mail':

                let m_url = 'mailto:?body=sayfaURL=' + encoded_url + "\n" + "\n" + encoded_words + '&subject=' + encoded_title;
                window.open(m_url, '_blank');
                break;
            case 'twitter':
                let t_url = 'http://twitter.com/share?text=' + encoded_words + '&url=' + encoded_url + '';
                window.open(t_url, '_blank');
                break;
            case 'facebook':
                let f_url = 'https://facebook.com/sharer/sharer.php?u=' + encoded_url + '&quote=sayfaURL=' + encoded_url + "\n" + "\n" + encoded_words + '';
                window.open(f_url, '_blank');
                break;
            case 'linkedin':
                let l_url = 'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + encoded_url + '&amp;title=' + encoded_title + '&amp;summary=' + encoded_words + '&amp;source=' + encoded_url + '';
                window.open(l_url, '_blank');
                break;
            case 'whatsapp':
                let w_url = 'whatsapp://send?text=sayfaURL=' + encoded_url + "\n" + "\n" + encoded_words + '';
                window.open(w_url);
                break;
        }
    }


    $('#comment-facebook').click(function () {
        $('html,body').animate({
                scrollTop: $(".comment-area-fb").offset().top
            },
            'slow');
    })



})


var test = document.getElementById("smart-text");

//Küçültüp Büyütme
function boyutlandir(multiplier) {


    if (test.style.fontSize === "") {
        test.style.fontSize = "1.3em";
    }
    test.style.fontSize = parseFloat(test.style.fontSize) + (multiplier * 0.3) + "em";
}

//Copy clipboard
function CopyToClipboard(containerid) {
    if (window.getSelection) {
        if (window.getSelection().empty) { // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) { // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) { // IE?
        document.selection.empty();
    }

    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        $.confirm({
            icon: 'fa fa-warning',
            theme: 'modern',
            animationBounce: 2,
            columnclass: 'col-md-12 col-md-offset-2',
            title: 'Metin Kopyalandı',
            content: '<h5><strong></strong> </h5>',
            btnClass: 'btn-success',
            typeAnimated: true,
            buttons: {
                ok: {
                    text: 'Tamam',
                    btnClass: 'btn-success',

                },
            }
        });

    }
}
