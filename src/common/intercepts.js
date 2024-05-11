function interceptFetch(callback) {
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
        const result = originalFetch(url, options);
        result.then(res => {
            callback(url, res, options);
        });
        return result;
    }
}

function interceptsXHR(callback) {
    const open = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        this.addEventListener('readystatechange', function () {
            callback(url, this.response, method, this.readyState);
        });
        open.apply(this, arguments);
    };
}