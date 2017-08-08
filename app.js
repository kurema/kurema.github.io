var GeneralApi = (function () {
    function GeneralApi() {
    }
    GeneralApi.GetJSONSimple = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
        xhr.open("GET", url);
        xhr.send();
    };
    GeneralApi.ReplaceTextByClass = function (text, class_name) {
        var titles = document.getElementsByClassName(class_name);
        for (var i = 0; i < titles.length; i++) {
            titles[i].textContent = text;
        }
    };
    return GeneralApi;
}());
var GithubApi = (function () {
    function GithubApi() {
        this.APIUrl = "https://api.github.com";
    }
    GithubApi.prototype.GetJSON = function (site, callback) {
        GeneralApi.GetJSONSimple(this.APIUrl + site, callback);
    };
    GithubApi.prototype.GetUserJSON = function (user, callback) {
        this.GetJSON("/users/" + user, callback);
    };
    return GithubApi;
}());
var Footer = (function () {
    function Footer() {
    }
    Footer.AddItem = function (item) {
        var container = document.getElementById("footer_container");
        return container.appendChild(item.GetHtml());
    };
    Footer.AddPlaceHolder = function (title) {
        if (title == null) {
            title = "Loading";
        }
        var item = new FooterItem(title);
        return this.AddItem(item);
    };
    Footer.OverwriteItem = function (item, node) {
        var container = document.getElementById("footer_container");
        var result = container.insertBefore(item.GetHtml(), node);
        container.removeChild(node);
        return result;
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
    var itemFollowPlaceHolder = Footer.AddPlaceHolder("Follow");
    GeneralApi.GetJSONSimple("data/data.json", function (content) {
        var item = new FooterItem("Follow");
        for (var i = 0; i < content.follow.length; i++) {
            item.PushList(content.follow[i].Title, content.follow[i].Reference, content.follow[i].Icon);
        }
        Footer.OverwriteItem(item, itemFollowPlaceHolder);
        GeneralApi.ReplaceTextByClass(content.title, "title");
        GeneralApi.ReplaceTextByClass(content.author, "kurema");
    });
    var itemProjectsPlaceHolder = Footer.AddPlaceHolder("Projects");
    var githubApi = new GithubApi();
    githubApi.GetUserJSON("kurema", function (content) {
        GeneralApi.GetJSONSimple(content.repos_url, function (contentRepo) {
            var projectItem = new FooterItem("Projects");
            for (var j = 0; j < contentRepo.length; j++) {
                projectItem.PushList(contentRepo[j].name, contentRepo[j].html_url);
            }
            Footer.OverwriteItem(projectItem, itemProjectsPlaceHolder);
        });
        GeneralApi.ReplaceTextByClass(content.public_repos, "github_repo_count");
        GeneralApi.ReplaceTextByClass(content.followers, "github_followers");
    });
    var article = document.getElementById("mainArticle");
};
//# sourceMappingURL=app.js.map