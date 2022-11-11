import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

const collectionRef = collection(db, "post");

class postService {
  createPost = (postData) => {
    return addDoc(collectionRef, postData);
  };

  getAllPost = () => {
    return getDocs(collectionRef);
  };

  readPost = (id) => {
    const docRef = doc(collectionRef, id);
    return getDoc(docRef);
  };
}

export default new postService();
