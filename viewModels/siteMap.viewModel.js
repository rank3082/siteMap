const axios = require("axios");
const HttpStatus = require("http-status-codes");
const {SiteMapResponse, SiteMap} = require("../models/siteMap.model");
const extractUrls = require("extract-urls");

function getPageUrls(pageUrl, callback) {
    fetchPageSource(pageUrl, ({data, error, code}) => {
        if(code !== HttpStatus.OK) {
            callback({urls: null, error: error})
            return
        }
        const urls = extractUrls(data);
        const siteMap = new SiteMap(pageUrl, urls)
        siteMap.filterByPageUrl(pageUrl)
        callback({urls: siteMap.urls, error: null})
    })
}

function fetchPageSource(pageUrl, callback) {
    axios.get(pageUrl)
        .then(response => {
            callback(new SiteMapResponse(response.data, null, response.status))
        }).catch(error => {
        if(error.response) {
            callback(new SiteMapResponse(null, `request to url ${pageUrl} failed with status code ${error.response.status}`, error.response.status))
            return
        }
        callback(new SiteMapResponse(null, `response from url ${pageUrl} did not received`, HttpStatus.INTERNAL_SERVER_ERROR))
    });
}

module.exports = {
    getPageUrls
}