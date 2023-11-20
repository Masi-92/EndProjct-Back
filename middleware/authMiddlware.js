import  Jwt  from "jsonwebtoken";

// Middleware für die Authentifizierung
export const auth = (req, res, next) => {
  try {
       // Hole das Token aus den Anfrage-Headern
    const token = req.headers.token;
    const decode = Jwt.verify(token, process.env.JWT_SECRET);

      // Setze den entschlüsselten Benutzer in das Anfrageobjekt

    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({ message: "access denied" });
  }
};
