$(document).ready(function() {
    console.log('loaded devmonkee');
    $('.container').on('click', '[component="topic/mark-homepage"]', function() {
        console.log('ok');
    });
});

