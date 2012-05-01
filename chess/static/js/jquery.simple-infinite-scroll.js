(function($) {
var InfiniteScroll = function(jq, total, threshold, url, method, data) {
    this.jq = jq;
    this.page = 1;
    this.total = total;
    this.threshold = threshold;
    this.url = url;
    this.data = data;
    this.method = method;
    this.jq.scroll($.proxy(this.scroll, this));
};
InfiniteScroll.prototype = {
    constructor: InfiniteScroll,
    loadPage: function() {
        var jq = this.jq, url = this.url;

        this.page++;
        this._loading = $[this.method](url, this.getData())
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
    },
    getData: function() {
        if (!this.data) {
            return { page: this.page };
        }
        if (data instanceof Object) {
            data.page = this.page;
            return data;
        } else {
            return [data, '&page=', this.page].join('');
        }
    }
};

$.fn.simpleInfiniteScroll = function(options) {
    var infScroll = new InfiniteScroll(this, options.totalPagesNumber,
            options.threshold, options.url, options.method, options.ajaxData);
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
