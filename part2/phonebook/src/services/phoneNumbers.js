import axios from "axios";

//const baseURL = "http://localhost:3001/persons";
const baseURL = "https://fullstackmooc.fly.dev/api/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const create = (newPhoneNumberObject) => {
  return axios
    .post(baseURL, newPhoneNumberObject)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(baseURL + `/${id}`).then((response) => response);
};

const update = (updatedPhoneNumberObject) =>
  axios
    .put(baseURL + `/${updatedPhoneNumberObject.id}`, updatedPhoneNumberObject)
    .then((response) => response.data);

export default { getAll, create, remove, update };
