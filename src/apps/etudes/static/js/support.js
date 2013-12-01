$(function() {
    $('#bug-report').click(function() {
        var self = $(this);
        var href = [self.attr('href'), '&body=',
            'Please, don\'t remove this information', '%0A',
            'url: ', location.href, '%0A',
            'userAgent: ', navigator.userAgent, '%0A',
            '--------------------------------------', '%0A'];
        self.attr('href', href.join(''));
    });
});
