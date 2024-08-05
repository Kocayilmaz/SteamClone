import axios from "axios";

export const fetchCardItems = () => {
  return axios({
    method: "GET",
    url: "http://localhost:3001/games",
  });
};
