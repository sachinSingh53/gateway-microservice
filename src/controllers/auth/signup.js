const { StatusCodes } = require("http-status-codes");
const { authService } = require("../../services/api/auth-service")


module.exports.create = async (req, res) => {

    const response = await authService.signUp(req.body);

    req.session = { jwt: response.data.token }

    res.status(StatusCodes.CREATED).json({
        message:response.data.message,
        user: response.data.user
    })

}

