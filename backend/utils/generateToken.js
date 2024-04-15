import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'70d'}
  );

  res.cookie('jwt', token, {
    httpOnly : true ,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 70 * 24 * 60 * 60 
  })
};
export default generateToken;

