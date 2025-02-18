import jwt from "jsonwebtoken";

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1] ?? null;
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

       // Check if token has expired
       const tokenExpiration = new Date(decoded.exp * 1000);
       if (tokenExpiration < new Date()) {
         return res.status(401).json({ message: "Session expired. Please log in again." });
       }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};

export default auth;
