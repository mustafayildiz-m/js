$(document).ready(function () {
    var video_time_elems = $('[data-trigger-process-bar="true"]');

    $.each(video_time_elems, function () {
        let total_video_time = $(this).data('video-time');

        let id = $(this).data('video-id');
        var video_info = $('#video-info-for-watch-' + id);
        if (total_video_time > 0) {
            let local_data = localStorage.getItem('akinplayerKaldigiyer_' + id);
            if (local_data > 0 && local_data !== null) {
                var video_bar = $('#video-time-' + id);

                let result = (local_data / total_video_time) * 100;
                video_info.html('<div style="text-align: center; margin-bottom: 10px; " class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill shadow"><span><i> İzlemeye Devam Et <i class="fa fa-angle-double-right" aria-hidden="true"></i></i> </span></div>');
                video_bar.css('width', result);
                video_bar.attr('aria-valuenow', result);
            } else if (typeof local_data === 'undefined') {

                video_info.html('<div style="text-align: center; margin-bottom: 10px;" class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill shadow"><span><i> İzle <i class="fa fa-angle-double-right" aria-hidden="true"></i></i> </span></div>');
            } else {

                video_info.html('<div style="text-align: center; margin-bottom: 10px;" class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill shadow"><span><i> İzle <i class="fa fa-angle-double-right" aria-hidden="true"></i></i> </span></div>');
            }
        } else {
            video_info.html('<div style="text-align: center; margin-bottom: 10px;" class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill shadow"><span><i> İzle <i class="fa fa-angle-double-right" aria-hidden="true"></i></i> </span></div>');
        }
    });
});