import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(
  collectionName: string,
  id: string
) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Query result:", data);

  if (data.length > 0) {
    callback({
      status: "error",
      message: "User already exists",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      ...userData,
      password: hashedPassword,
      role: userData.role || "user",
    };

    await addDoc(collection(db, "users"), newUser);
    callback({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error: any) {
    callback({
      status: "error",
      message: error.message,
    });
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ id: string; email: string; fullname: string; role: string } | null> {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    if (users.length === 0) {
      console.log("User not found");
      return null;
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password does not match");
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role || "user",
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}