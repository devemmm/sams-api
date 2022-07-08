const jwt = require('jsonwebtoken')
const User = require('../users/schema')

class Authorization {

    async requireAuth(req, res, next) {

        const { authorization } = req.headers

        try {
            if (!authorization) {
                throw new Error('authorization token is null')
            }

            const token = authorization.replace('Bearer ', "");

            jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {

                try {
                    if (error) {
                        throw new Error("authorization token is invalid")
                    }

                    const tokenData = await User.findOne({ 'tokens.token': token })

                    if (!tokenData) {
                        throw new Error("authorization token expired please signin again")
                    }


                    const user = await User.findOne({ _id: tokenData._id })

                    if (!user) {
                        throw new Error('session was been  expired please signin again')
                    }

                    req.user = user
                    req.user.token = token
                    next()
                } catch (error) {
                    res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
                }
            })

        } catch (error) {
            res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
        }
    }
}



module.exports = Authorization