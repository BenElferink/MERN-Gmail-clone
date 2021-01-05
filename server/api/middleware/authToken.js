import jwt from 'jsonwebtoken';
// "secret key" generator   --->   https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
// Reminder: make sure to set up a secret key in .env (the presented 'secret' is not production valid)

export const authenticateToken = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      new Buffer.from(process.env.JWT_SECRET || 'secret', 'base64'),
    );
    request.user = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    response.status(401).json({ message: error.message });
  }
};
