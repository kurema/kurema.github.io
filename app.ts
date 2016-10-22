class GithubApi {
    APIUrl: string = "https://api.github.com";
    GetJSON(site: string, callback: (content: any) => void) {
        GithubApi.GetJSONSimple(this.APIUrl + site, callback);
    }

    static GetJSONSimple(url: string, callback: (content: any) => void) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status = 200) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    GetUserJSON(user: string, callback: (content: any) => void) {
        this.GetJSON("/users/" + user, callback);
    }
}

window.onload = () => {
    var githubapi = new GithubApi();
    githubapi.GetUserJSON("kurema", (content) => {
        var githubCard = document.getElementById("githubCard");

        var githubImgs = githubCard.getElementsByTagName("img");
        for (var i = 0; i < githubImgs.length; i++) {
            if (githubImgs[i].classList.contains("avatar")){
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