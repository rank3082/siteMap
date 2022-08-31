class SiteMap {
    constructor(pageUrl, urls) {
        this.pageUrl = pageUrl
        this.urls = urls
    }

    removeLeadingHttp(url) {
        return url.replace("https://", "").replace("http://", "")
    }

    filterByPageUrl() {
        const pageUrl = this.removeLeadingHttp(this.pageUrl)
        for(let i=0;i<this.urls.length;i++) {
            const url = this.removeLeadingHttp(this.urls[i])
            if(url.indexOf(pageUrl) < 0) {
                this.urls[i] = null
            }
        }
        this.urls = this.urls.filter(url => {
            return url !== null
        });
    }
}

module.exports = {
    SiteMap
}