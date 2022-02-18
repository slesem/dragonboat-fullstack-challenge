// This model mocks a real database model for the sake com simplicity
const data = [
  {
    id: 1,
    title: "Project 1",
    author: "Tom Haverford",
    start_date: "2022-10-20",
    end_date: "2022-02-18",
  },
  {
    id: 2,
    title: "Project 2",
    author: "Ann Perkins",
    start_date: "2022-02-18",
    end_date: "2022-02-28",
  },
  {
    id: 3,
    title: "Project 3",
    author: "Leslie Knope",
    start_date: "2021-08-01",
    end_date: "2022-03-25",
  },
  {
    id: 4,
    title: "Project 4",
    author: "Ron Swanson",
    start_date: "2022-02-25",
    end_date: "2023-01-01",
  },
  {
    id: 5,
    title: "Project 5",
    author: "Jean Ralphio",
    start_date: "2022-02-18",
    end_date: "2025-07-20",
  },
];

let id_counter = 5;

export default class {
  // receives conditions like { title: 'Project 5' } and returns a list of matches
  static findAll = (conditions = {}) => {
    return data
      .filter((obj) =>
        Object.entries(conditions).reduce((curr, [key, condition]) => {
          if (!curr) return false;
          return obj[key] === condition;
        }, true)
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  // receives conditions like { title: 'Project 5' } and returns the first match
  static findOne = (conditions = {}) => {
    return data.find((obj) =>
      Object.entries(conditions).reduce((curr, [key, condition]) => {
        if (!curr) return false;
        return obj[key] === condition;
      }, true)
    );
  };

  static create = (body = {}) => {
    id_counter = id_counter + 1;
    const obj = { ...body, id: id_counter };
    data.push(obj);
    return obj;
  };

  static update = (id, body = {}) => {
    const index = data.findIndex(i => i.id === id);
    if (!index) return false;
    data[index] = { id, ...body };
    return data[index];
  };


  static deleteOne = (id) => {
    const index = data.findIndex(i => i.id === id) 
    if (!index) return false;
    data.splice(index, 1);
    return true;
  };

  // You can add more methods to this mock to extend its functionality or
  // rewrite it to use any kind of database system (eg. mongo, postgres, etc.)
  // it is not part of the evaluation process
}
