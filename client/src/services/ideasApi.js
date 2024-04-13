import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiURL = "/api/ideas";
  }
  getIdeas() {
    return axios.get(this._apiURL);
  }
  createIdea(data) {
    return axios.post(this._apiURL, data);
  }
  updateIdea(id, data) {
    return axios.put(`${this._apiURL}/${id}`, data);
  }
  deleteIdea(id) {
    const username = localStorage.getItem("user") ?? "";
    return axios.delete(`${this._apiURL}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new IdeasApi();
