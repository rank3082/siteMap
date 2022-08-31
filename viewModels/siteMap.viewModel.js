const axios = require("axios");
const HttpStatus = require("http-status-codes");
const {SiteMap} = require("../models/siteMap.model");
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
            callback({data: response.data, error: null, code: response.status})
        }).catch(error => {
        if(error.response) {
            callback({data: null, error: `request to url ${pageUrl} failed with status code ${error.response.status}`, code: error.response.status})
            return
        }
        callback({data: null, error: `response from url ${pageUrl} did not received`, code: HttpStatus.INTERNAL_SERVER_ERROR})
    });
}

module.exports = {
    getPageUrls
}