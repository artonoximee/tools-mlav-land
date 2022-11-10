import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PublicSearch from "./PublicSearch";
import PublicListItem from "./PublicListItem";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function Public() {
  const [id, setId] = useState("");
  const [transfers, setTransfers] = useState();

  useEffect(() => {
    if (id.length === 36) {
      console.log("searching database")
      getTransfers(id);
    } else if (id.length !== 36) {
      setTransfers()
    }
  }, [id])

  async function getTransfers(formId) {
    const q = query(collection(db, "transfers"), where("projectId", "==", formId));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByCreationDate(arr);
    setTransfers(arr);
  }

  function handleChange(e) {
    setId(e.target.value);
  }

  return (
    <div className="row justify-content-center">
      <main className="col-lg-8 col-md-10 px-md-4 p-5">
        <PublicSearch handleChange={ (e) => handleChange(e) } />
        {
          transfers &&
          transfers.map(transfer => <PublicListItem transfer={ transfer } />)
        }
      </main>
    </div>
  )
}

export default Public;