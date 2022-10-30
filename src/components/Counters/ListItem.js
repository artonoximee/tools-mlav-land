import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ListItem(props) {
  const [hoursSpent, setHoursSpent] = useState(0);
  const [daysSpent, setDaysSpent] = useState(0);
  const { id, name } = props.project

  useEffect(() => {
    getCounters()
  }, [])

  useEffect(() => {
    setDaysSpent(Math.round((hoursSpent / 8) * 10) / 10)
  }, [hoursSpent])

  async function getCounters() {
    const q = query(collection(db, "counters"), where("projectId", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
      setHoursSpent(prev => prev + Number(doc.data().time))
    });
  }

  return (
    <div className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="row">
        <div className="col-lg-8">
          <h5>{ name }</h5>
        </div>
        <div className="col-lg-2">
          <small className="badge rounded-pill text-bg-secondary float-end">{ hoursSpent } h</small>
        </div>
        <div className="col-lg-2">
          <small className="badge rounded-pill text-bg-primary float-end">{ daysSpent } jour{ daysSpent > 1 ? "s" : "" }</small>
        </div>
      </div>
    </div>
  )
}

export default ListItem;