/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { CSVLink } from "react-csv";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import ListItem from "./ListItem";
import CreateModal from "./CreateModal";
import sortByCreationDate from "../../helpers/sortByCreationDate";

import "./List.css";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [counters, setCounters] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [reload, setReload] = useState();

  useEffect(() => {
    getProjects()
    getCounters()
  }, [reload])

  async function getProjects() {
    const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByCreationDate(arr);
    setProjects(arr);
  }

  async function getCounters() {
    const q = query(collection(db, "counters"));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setCounters(arr);
  }

  function sumHours(projectId, counters) {
    let sumHours = 0;
    counters.forEach(counter => {
      if (counter.projectId === projectId) {
        sumHours += Number(counter.time)
      }
    })
    return sumHours
  }

  function hoursToDays(hours) {
    return Math.round((hours / 8) * 10) / 10
  }

  function formatDataForChart(projects, counters) {
    let data = []
    projects.forEach(project => {
      const projectName = project.acronym;
      const projectDays = hoursToDays(sumHours(project.id, counters));
      if (projectDays > 0) {
        data.push({name: projectName, days: projectDays});
      }
    })
    return data;
  }

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  function csvData(projects, counters) {
    let csvData = []
    counters.forEach(counter => {
      let project = projects.filter(project => project.id === counter.projectId)
      if (project.length > 0) {
        csvData.push([counter.id, project[0].acronym, project[0].name, counter.createdAt, counter.time])
      }
    })
    return csvData
  }

  return (
    <>
      <h4>⏱️ Compteurs</h4>
      <hr />
      <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau temps</button>
      <div className="h-50">
      {
        projects && counters &&
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ formatDataForChart(projects, counters) }
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis dataKey="name" textAnchor="end" tick={{ angle: -45 }} />
            <YAxis />
            <Tooltip viewBox={{ x: 0, y: 0, width: 400, height: 400 }} />
            <Bar dataKey="days" fill="#0b6efd" />
          </BarChart>
        </ResponsiveContainer>
      }
      </div>

      <table className="table table-dark mt-5">
        <tbody>
          {
            projects && counters &&
            projects.map((project) => (
            <ListItem 
              key={ project.id } 
              project={ project }
              hours={ sumHours(project.id, counters) }
            />
            ))
          }
        </tbody>
      </table>

      {
        projects && counters &&
        <CSVLink 
          data={ csvData(projects, counters) }
          filename={"counters-export.csv"} 
          className="btn btn-outline-secondary mt-3 float-end"
        >
          🖨️
          Export CSV
        </CSVLink>
      }

      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}
    </>
  )
}

export default List;