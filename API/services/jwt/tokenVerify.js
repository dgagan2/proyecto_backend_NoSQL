const jsonwebtoken = require("jsonwebtoken")

async function verifyToken (token, secret) {
    return jsonwebtoken.verify(token, secret)
}

module.exports= verifyToken