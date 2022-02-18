import ProjectsService from "./projects.service";

export default class {

  getOne = (id) => {
    const service = new ProjectsService();

    return service.getOne(id);
  };

  get = () => {
    const service = new ProjectsService();

    return service.getAll();
  };

  create = (params) => {
    const service = new ProjectsService();

    return service.create(params);
  } 

  update = (id, body) => {
    const service = new ProjectsService();

    return service.update(id, body);
  } 

  deleteOne = (id) => {
    const service = new ProjectsService();

    return service.deleteOne(id);
  };
}
