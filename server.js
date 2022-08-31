const express = require('express')
const siteMapRouter = require('./routes/siteMap.router')
const app = express()
const PORT = 80

app.use(express.json())

app.use('/', siteMapRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})