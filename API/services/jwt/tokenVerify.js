const jsonwebtoken = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

async function verifyToken (token) {
    return jsonwebtoken.verify(token, secret)
}
const payload = verifyToken(token)

module.exports= payload