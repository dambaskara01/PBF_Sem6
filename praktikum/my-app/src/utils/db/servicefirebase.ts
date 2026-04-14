import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  if (!snapshot.exists()) {
    return null;
  }

  const data = {
    id: snapshot.id,
    ...snapshot.data(),
  };

  return data;
}
