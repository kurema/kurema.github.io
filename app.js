var GithubApi = (function () {
    function GithubApi() {
        this.APIUrl = "https://api.github.com";
    }
    GithubApi.prototype.GetJSON = function (site, callback) {
        GithubApi.GetJSONSimple(this.APIUrl + site, callback);
    };
    GithubApi.GetJSONSimple = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status = 200) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
        xhr.open("GET", url);
        xhr.send();
    };
    GithubApi.prototype.GetUserJSON = function (user, callback) {
        this.GetJSON("/users/" + user, callback);
    };
    return GithubApi;
}());
window.onload = function () {
};
//# sourceMappingURL=app.js.map