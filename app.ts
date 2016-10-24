class GeneralApi {
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
}


class GithubApi {
    APIUrl: string = "https://api.github.com";
    GetJSON(site: string, callback: (content: any) => void) {
        GeneralApi.GetJSONSimple(this.APIUrl + site, callback);
    }

    GetUserJSON(user: string, callback: (content: any) => void) {
        this.GetJSON("/users/" + user, callback);
    }
}

class Footer {

    static AddItem(item: FooterItem): Node {
        var container = document.getElementById("footer_container");
        return container.appendChild(item.GetHtml());
    }

    static AddPlaceHolder(title?: string): Node {
        if (title == null) {
            title = "Loading";
        }
        var item = new FooterItem(title);
        return this.AddItem(item);
    }

    static OverwriteItem(item: FooterItem,node:Node): Node {
        var container = document.getElementById("footer_container");
        var result = container.insertBefore(item.GetHtml(), node);
        container.removeChild(node);
        return result;
    }

}

class FooterItem {
    Title: string;
    Items: FooterList[];

    constructor(Title?: string) {
        this.Title = Title;
        this.Items = new Array();
    }


    GetHtml(): HTMLElement {
        var result = document.createElement("div");
        result.className = "item";

        var h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(this.Title));
        result.appendChild(h5);

        var ul = document.createElement("ul");
        for (var i = 0; i < this.Items.length; i++) {
            var item = document.createElement("li");
            item.appendChild(this.Items[i].GetHtml());
            ul.appendChild(item);
        }
        result.appendChild(ul);

        return result;
    }

    PushList(Text: string, Reference?: string, Icon?: string) {
        this.Items.push(new FooterList(Text, Reference, Icon));
    }
    
}

class FooterList {
    Text: string;
    Reference: string;
    Icon: string;

    constructor(Text: string, Reference?: string, Icon?: string) {
        this.Text = Text;
        this.Reference = Reference;
        this.Icon = Icon;
    }

    GetHtml(): HTMLElement {
        var icon = document.createElement("img");
        icon.src = this.Icon;

        if (this.Reference != null) {
            var result = document.createElement("a");
            result.setAttribute("href", this.Reference);
            if (this.Icon != null) {
                result.appendChild(icon);
            }
            result.appendChild(document.createTextNode(this.Text));
            return result;
        } else {
            var result2 = document.createElement("span");
            if (this.Icon != null) {
                result2.appendChild(icon);
            }
            result2.appendChild(document.createTextNode(this.Text));
            return result2;
        }
    }
}

window.onload = () => {
    var itemFollowPlaceHolder = Footer.AddPlaceHolder("Follow");
    GeneralApi.GetJSONSimple("data/data.json", (content) => {
        var item = new FooterItem("Follow");
        for (var i = 0; i < content.follow.length; i++) {
            item.PushList(content.follow[i].Title, content.follow[i].Reference, content.follow[i].Icon);
        }
        Footer.OverwriteItem(item, itemFollowPlaceHolder);

        var titles = document.getElementsByClassName("title");
        for (var i = 0; i < titles.length; i++) {
            titles[i].textContent = content.title;
        }
    });

    var itemProjectsPlaceHolder = Footer.AddPlaceHolder("Projects");
    var githubApi = new GithubApi();
    githubApi.GetUserJSON("kurema", (content) => {
        GeneralApi.GetJSONSimple(content.repos_url, (contentRepo) => {
            var projectItem = new FooterItem("Projects");
            for (var j = 0; j < contentRepo.length; j++) {
                projectItem.PushList(contentRepo[j].name, contentRepo[j].html_url);
            }
            Footer.OverwriteItem(projectItem, itemProjectsPlaceHolder);
        });
    });

    var article = document.getElementById("mainArticle");
};