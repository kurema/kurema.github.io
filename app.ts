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

class Footer {

    AddItem(item: FooterItem) {
        var container = document.getElementById("footer_container");
        container.appendChild(item.GetHtml());
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
    var footer = new Footer();

    var item = new FooterItem("Follow");
    item.PushList("Github", "https://github.com/kurema","image/GitHub-Mark-Light-64px.png");
    item.PushList("Twitter", "https://twitter.com/kurema_makoto", "image/Twitter_Logo_White_On_Blue.svg");
    item.PushList("Blog", "https://kuremako.wordpress.com", "https://s.w.org/about/images/logos/wordpress-logo-32-blue.png");
    item.PushList("Youtube", "https://www.youtube.com/channel/UCRXOgsw-LUdgPSN95myPw7g", "image/YouTube-social-circle_red_48px.png");

    footer.AddItem(item);

    var projectItem = new FooterItem("Projects");
    var githubApi = new GithubApi();
    githubApi.GetUserJSON("kurema", (content) => {
        GithubApi.GetJSONSimple(content.repos_url, (contentRepo) => {
            for (var j = 0; j < contentRepo.length; j++) {
                projectItem.PushList(contentRepo[j].name, contentRepo[j].html_url);
            }
            footer.AddItem(projectItem);
        });
    });
};