/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('body').on('click', '.star', function () {
        set_star(this);
    });
});
function set_star($this) {
    var done = $($this).parent('span').data('done');
   // console.log(done);
    if (done == 0) {
        var star = $($this).data('num');
        if (star < 1 || star > 5) {
            star = 5;
        }
        var id = $($this).parent('span').data('nesne-id');
        var url = THIS_HOST+'/student/loads/proccess.php?proccess=star&nesne_id=' + id + '&star=' + star;
        var result = get(url);
        if (result) {
            $($this).parent('span').data('done','1');
            for (var i = 1; i <= star; i++) {
                $('[data-num="' + i + '"]').addClass('star-active');
                $('[data-num="' + i + '"]').removeClass('star');
            }
        }
    }
}


