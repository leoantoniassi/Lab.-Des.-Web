import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/ToDo",
  headers: {
    "Content-Type": "Application/json",
  },
});
export const createToDo = (payload) => api.post("/Create", payload); // exportando a função createToDo
export const getTodos = () => api.get("/getAll"); // exportando a função getTodos
export const deleteToDo = (id) => api.delete(`/${id}`); // exportando a função deleteToDo
export const getOne = (id) => api.get(`/${id}`); // exportando a função getOne
export const updateAll = (id, data) => api.put(`/${id}`, data); // exportando a função updateAll
export const updatePartial = (id, data) => api.patch(`/${id}`, data); // exportando a função updatePartial
export default api;
