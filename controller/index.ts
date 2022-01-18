import LinkConverterController from "./LinkConverterController";
import { Application } from "express";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", LinkConverterController);
  }
}
