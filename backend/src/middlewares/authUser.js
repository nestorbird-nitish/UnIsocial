
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization') 
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, unauthorized user"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username;
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    next();
};

