(function($) {
var InfiniteScroll = function(jq, total, threshold, url, method) {
    this.jq = jq;
    this.page = 1;
    this.total = total;
    this.threshold = threshold;
    this.url = url;
    this.method = method;
    this.jq.scroll($.proxy(this.scroll, this));
};
InfiniteScroll.prototype = {
    constructor: InfiniteScroll,
    loadPage: function() {
        var jq = this.jq;
        this._loading = $[this.method](this.url, { page: ++this.page })
                .success(function(data) { jq.trigger('pageLoaded', data); });
        if (this.page === this.total) {
            this.jq.off('scroll');
        }
    },
    scroll: function() {
        if (!this._loading || this._loading.isResolved()) {
            var jq = this.jq, height = jq.height(), scrollTop = jq.scrollTop();
            var scrollHeight = jq.prop('scrollHeight');
            if (scrollHeight - height - scrollTop < this.threshold) {
                this.loadPage();
            }
        }
    }
};

$.fn.simpleInfiniteScroll = function(options) {
    var infScroll = new InfiniteScroll(this, options.totalPagesNumber,
                options.threshold, options.url, options.method);
    this.data('infiniteScroll', infScroll)
        .on('pageLoaded', options.newPageLoaded);
    return this;
};
}(jQuery));


$(function() {
    var composers = $('.composers-list');
    composers.simpleInfiniteScroll({
        threshold: 100,
        method: 'get',
        url: window.location.href,
        totalPagesNumber: composers.data('totalPages'),
        newPageLoaded: function(e, data) {
            $(this).append(data);
        }
    });
});
