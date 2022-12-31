

var request;  //lastest image to be requested
var $current; //image currently being shown
var cache = {}; //cache object
var $frame = $('#photo-viewer');//container for image
var $thumbs = $('.thumb');//thumbnails

function crossfade($img) {
    
    if($current) {
        $current.stop().fadeOut('slow');
    }

    $img.css({
        marginLeft: -$img.width() / 2,
        marginTop: -$img.height() / 2
    });

    $img.stop().fadeTo('slow', 1);

    $current = $img;
}

$(document).on('click', 'thumb', function(e){
    var $img,
        src = this.href;
        request = src;

    e.preventDefault();

    $thumbs.removeClass('active');
    $(this).addClass('active');

    if(cache.hasOwnProperty(src)) {
        if(cache[src].isLoading === false) {
            crossfade(cache[src].$img);
        }
    } else {
        $img = $('<img/>');
        cache[src] = {
            $img: $img,
            isLoading: true
        };

        //next few lines will run when image has loaded but are prepared first
        $img.on('load', function(){
            $img.hide();
            //remove is-loading class from frame & append new image to it
            $frame.removeClass('is-loading').append($img);
            cache[src].isLoading = false;
            //if still most recently requested image then
            if(request === src){
                crossfade($img);
            }
        });

        $frame.addClass('is-loading');

        $img.attr({
            'src': src,
            'alt': this.title || ''
        });
    }
});

//final line runs once when rest of script has loaded to show the first image
$('.thumb').eq(0).click();