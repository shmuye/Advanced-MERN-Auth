import jwt from 'jsonwebtoken';
export const protectRoute = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).send('Unauthorized');
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return res.status(401).json({
        success: false,
        message: 'Unauthorized - invalid token'
    })
    req.userId = decoded.userId;
    next()
 }catch(err) {
     console.log("error in verifying token", error)
     return res.status(500).json({
         success: false,
         message: "server error"
     })
 }
}