const express = require("express");
const {getSiteMap} = require("../controllers/siteMap.controller");
const siteMapRouter = express.Router()

siteMapRouter.get('/', getSiteMap)

module.exports = siteMapRouter