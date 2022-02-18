import { Router } from "express";

import RestControllerMixin from "../utils/RestControllerMixin";
import ProjectsController from "./projects.controller";

export default class extends RestControllerMixin(ProjectsController) {
  constructor() {
    super();
    const router = Router();

    router.get("/", async (req, res, next) => {
      try {
        const projects = await this.get();

        return res.status(200).send(projects);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id", async (req, res, next) => {
      try {
        const project = await this.getOne(+req.params.id);

        return res.status(200).send(project);
      } catch (err) {
        next(err);
      }
    });

    router.post("/", async (req, res, next) => {
      try {
        const project = await this.create(req.body);

        return res.status(200).send(project);
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/edit/", async (req, res, next) => {
      try {
        const project = await this.update(+req.params.id, req.body);

        return res.status(200).send(project);
      } catch (err) {
        next(err)
      }
    });

    router.delete("/:id", async (req, res, next) => {
      try {
        await this.deleteOne(+req.params.id);

        return res.status(200).send({msg: "Successfully Deleted"});
      } catch (err) {
        next(err);
      }
    });

    this.router = router;
  }
}
