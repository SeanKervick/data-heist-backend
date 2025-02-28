import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  // will split into ["Bearer", "xxxx.yyyy.zzzz"]
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Token Received:", token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);// Add the decoded payload to the request for access in other routes
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    req.user = decoded;
    console.log("Decoded Token:", decoded);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token invalid' });
  }
};

export { verifyToken };

