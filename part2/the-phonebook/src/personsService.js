import axios from "axios";

const baseUrl =
  "https://gregorian-fullstack-ex-part3.herokuapp.com/api/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((res) => res.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res);

const update = (id, person) =>
  axios.put(`${baseUrl}/${id}`, person).then((res) => res.data);

export default {
  getAll,
  create,
  remove,
  update,
};
