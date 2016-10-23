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
};