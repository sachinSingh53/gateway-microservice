import { StatusCodes } from "http-status-codes";
import { authService } from "../../services/api/auth-service.js";


//to find currentUser
export const read = async (req, res) => {
    const response = await authService.getCurrentUser();
    res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user
    });
};

export const resendEmail = async(req,res) => {
    const response = await authService.resendEmail(req.body);
    res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user
    });
}