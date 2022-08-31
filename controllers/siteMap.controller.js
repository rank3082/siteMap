const HttpStatus = require('http-status-codes');
const {getPageUrls} = require("../viewModels/siteMap.viewModel");

function getSiteMap(req, res) {
    const pageUrl = req.query.url

    getPageUrls(pageUrl, ({urls, error}) => {
        if(error) {
            res.status(HttpStatus.BAD_REQUEST).json({error})
            return
        }
        res.status(HttpStatus.OK).json(urls)
    })
}

module.exports = {
    getSiteMap,
}