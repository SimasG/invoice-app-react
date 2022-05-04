import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { createRandomLetters, createRandomNumbers } from "../misc/idGenerator";

const useFetchInvoices = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "users", currentUser.uid, "invoices");
        const unsub = onSnapshot(ref, (querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            // weird that we have access to doc.id but it isn't part of doc.data
            // list.push({ id: doc.id, ...doc.data() });
            // creating a custom id for each invoice to follow the project guidelines
            // console.log(doc.data());
            list.push({
              id: `${createRandomLetters(2)}${createRandomNumbers(4)}`,
              ...doc.data(),
            });
          });
          setData(list);
        });
        return () => unsub();
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchInvoices;
