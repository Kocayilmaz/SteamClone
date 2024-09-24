import { database } from "./firebase";
import { get, ref } from "firebase/database";

export const readData = async () => {
  try {
    const dataRef = ref(database, "/games");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available at the path:");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    throw error;
  }
};
