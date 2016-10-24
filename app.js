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
var Footer = (function () {
    function Footer() {
    }
    Footer.prototype.AddItem = function (item) {
        var container = document.getElementById("footer_container");
        container.appendChild(item.GetHtml());
    };
    return Footer;
}());
var FooterItem = (function () {
    function FooterItem(Title) {
        this.Title = Title;
        this.Items = new Array();
    }
    FooterItem.prototype.GetHtml = function () {
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
    };
    FooterItem.prototype.PushList = function (Text, Reference, Icon) {
        this.Items.push(new FooterList(Text, Reference, Icon));
    };
    return FooterItem;
}());
var FooterList = (function () {
    function FooterList(Text, Reference, Icon) {
        this.Text = Text;
        this.Reference = Reference;
        this.Icon = Icon;
    }
    FooterList.prototype.GetHtml = function () {
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
        }
        else {
            var result2 = document.createElement("span");
            if (this.Icon != null) {
                result2.appendChild(icon);
            }
            result2.appendChild(document.createTextNode(this.Text));
            return result2;
        }
    };
    return FooterList;
}());
window.onload = function () {
    var footer = new Footer();
    var item = new FooterItem("Follow");
    item.PushList("Github", "https://github.com/kurema", "logo/GitHub-Mark-Light-64px.png");
    item.PushList("Twitter", "https://twitter.com/kurema_makoto", "logo/Twitter_Logo_White_On_Blue.svg");
    item.PushList("Blog", "https://kuremako.wordpress.com", "https://s.w.org/about/images/logos/wordpress-logo-32-blue.png");
    item.PushList("Youtube", "https://www.youtube.com/channel/UCRXOgsw-LUdgPSN95myPw7g", "logo/YouTube-social-circle_red_48px.png");
    footer.AddItem(item);
    var projectItem = new FooterItem("Projects");
    var githubApi = new GithubApi();
    githubApi.GetUserJSON("kurema", function (content) {
        GithubApi.GetJSONSimple(content.repos_url, function (contentRepo) {
            for (var j = 0; j < contentRepo.length; j++) {
                projectItem.PushList(contentRepo[j].name, contentRepo[j].html_url);
            }
            footer.AddItem(projectItem);
        });
    });
    var article = document.getElementById("mainArticle");
    article.innerText += "工事中です。 ";
};
//# sourceMappingURL=app.js.map