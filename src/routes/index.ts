import express from "express";
import login from "./login.routes";
import post from "./post.routes";

const allRoutes = (app: any) => {
  app.use(express.json(), express.urlencoded({ extended: false }));
  app.use(login, post);
};

export default allRoutes;
