import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Connection from "../models/user";
dotenv.config();

class LoginController {
  async registerUser(req: any, res: any): Promise<LoginController> {
    const Controller = new LoginController();
    const { phone } = req.body;
    const payload = { phone };

    try {
      await Connection.create(payload);
      return Controller.loginUser(req, res);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro inesperado" });
    }
  }

  async loginUser(req: any, res: any) {
    const Controller = new LoginController();
    const { phone } = req.body;

    if (!phone) return res.status(401).json({ msg: "Celular não informado" });

    try {
      const user: any = await Connection.findOne({ phone: phone });
      if (!user) return Controller.registerUser(req, res);

      const token = jwt.sign(
        { _id: user._id, phone: user.phone },
        process.env.KEYJWT || "",
        {
          expiresIn: process.env.EXPIRATIONJWT || "",
        }
      );

      return res.json({ token, user });
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro inesperado" });
    }
  }
}

export default new LoginController();
