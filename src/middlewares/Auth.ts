import Connection from "../models/user";
import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();

class Authentication {
  async verify(req: any, res: any, next: any) {
    try {
      const { authorization } = req.headers;
      const [, token] = authorization?.split(" ");

      if (!token) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      const data: any = jwt.verify(token, process.env.KEYJWT || "");
      const { phone } = data;

      const currentUser: any = Connection.findOne({ phone });

      if (!currentUser)
        return res.status(401).json({ msg: "Houve um erro com seu usuário!" });

      req.user_tkn = data;

      return next();
    } catch (e) {
      return res.status(401).json({
        msg: "Acesso inválido ou expirado!",
      });
    }
  }
}

export default new Authentication();
