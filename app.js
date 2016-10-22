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
    var githubapi = new GithubApi();
    githubapi.GetUserJSON("kurema", function (content) {
        var githubCard = document.getElementById("githubCard");
        var githubImgs = githubCard.getElementsByTagName("img");
        for (var i = 0; i < githubImgs.length; i++) {
            if (githubImgs[i].classList.contains("avatar")) {
                githubImgs[i].setAttribute("src", content.avatar_url);
            }
        }
        var githubUserLinks = githubCard.getElementsByTagName("a");
        for (var i = 0; i < githubUserLinks.length; i++) {
            if (githubUserLinks[i].classList.contains("userLink")) {
                githubUserLinks[i].setAttribute("href", content.html_url);
                githubUserLinks[i].innerText = content.name;
            }
        }
    });
};
//# sourceMappingURL=app.js.map