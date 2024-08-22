import { database } from "./firebase";
import { get, ref } from "firebase/database";

// Veriyi okuma işlevi
export const readData = async () => {
  try {
    const dataRef = ref(database, "/games"); // Veriyi okuyacağımız referans
    const snapshot = await get(dataRef); // Veriyi almak için get() metodunu kullan
    if (snapshot.exists()) {
      return snapshot.val(); // Veriyi döndür
    } else {
      console.log("No data available at the path:");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    throw error;
  }
};
