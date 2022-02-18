import Projects from "db/projects";
import Service from "../utils/Service";

import ObjectDoesNotExistError from "../utils/exceptions/ObjectDoesNotExistError";

export default class extends Service {
  getOne = (id) => {
    const project = Projects.findOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  };

  getAll = () => {
    return Projects.findAll();
  };

  create = (params) => {
    const project = Projects.create(params)
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  } 
  
  update = (id, body) => {
    const project = Projects.update(id, body)
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  }

  deleteOne = (id) => {
    const project = Projects.deleteOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  }
}
