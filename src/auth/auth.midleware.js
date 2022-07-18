require('dotenv').config()
const jwt = require('jsonwebtoken')
const { findByIdUserService } = require("../users/users.services")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ message: "o Token não foi informado" })
    }

    const parts = authHeader.split(" "); /*["Bearer", "asasasadadada"]*/

    if (parts.length !== 2) {
        return res.status(401).send({ message: "Token Invalido" })
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: "Token malformatado" })

    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        const user = await findByIdUserService(decoded.id)

        if (err || !user || !user.id) {
            return res.status(401).send({ message: "Token Invalido" })

        }

        req.userId = user.id;

        return next();
    });

    
}