$(document).ready(function() {
    $('.container').on('click', 'button[component="topic/mark-homepage"]', function() {
        var $this = $(this);
        $this.attr('disabled', true);
        var tid = $this.data('tid');
        $.post('/api/v3/plugins/homepage/sticky/' + tid, (resp) => {
            if (typeof resp == 'string') resp = JSON.parse(resp);
            if (resp.status.code == 'ok' && resp.response.timestamp > 0) {
                $this.addClass('hidden').attr('disabled', false);
                $('button[component="topic/unmark-homepage"]').removeClass('hidden');
            }
        });
    });

    $('.container').on('click', 'button[component="topic/unmark-homepage"]', function() {
        var $this = $(this);
        var tid = $this.data('tid');
        $this.attr('disabled', true);
        $.post('/api/v3/plugins/homepage/unsticky/' + tid, (resp) => {
            if (typeof resp == 'string') resp = JSON.parse(resp);
            if (resp.status.code == 'ok' && resp.response.timestamp > 0) {
                $this.addClass('hidden').attr('disabled', false);
                $('button[component="topic/mark-homepage"]').removeClass('hidden');
            }
        });
    });
});

