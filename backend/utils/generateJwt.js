import jwt from 'jsonwebtoken';
const generateJWT = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    const maxAge = 15*24*60*60*1000;
    res.cookie('jwt',token, {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default generateJWT;