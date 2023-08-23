const jsonwebtoken = require("jsonwebtoken")
const jwtConfig = {
    expiresIn: '1d'
}
function signToken (payload, secret) {
    return jsonwebtoken.sign(payload, secret, jwtConfig)
}

module.exports=signToken