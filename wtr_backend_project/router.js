const { Router } = require('express')
const router = Router()

router.get("/", (request, response) => {

    response.status(200).json({ "message": "server is online" })
})

module.exports = router