import { fetchCardItems } from "./Axios";

export const fetchAllData = async () => {
  try {
    const response = await fetchCardItems();
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataByCategory = async () => {
  try {
    const response = await fetchCardItems();
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
