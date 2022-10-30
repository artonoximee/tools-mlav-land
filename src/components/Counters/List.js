import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import ListItem from "./ListItem";
import sortByCreationDate from "../../helpers/sortByCreationDate";

import "./List.css";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [counters, setCounters] = useState();

  useEffect(() => {
    getProjects()
    getCounters()
  }, [])

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
      data.push({name: projectName, days: projectDays});
    })
    return data;
  }

  return (
    <>
      <h4>⏱️ Compteur</h4>
      <hr />
      <Link to="/counters/new" className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau temps</Link>
      {
        projects && counters &&
        <ResponsiveContainer width="100%" height="50%">
          <BarChart
            data={formatDataForChart(projects, counters)}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 40,
            }}
          >
            <XAxis dataKey="name" textAnchor="end" tick={{ angle: -45 }} />
            <YAxis />
            <Tooltip viewBox={{ x: 0, y: 0, width: 400, height: 400 }} />
            <Bar dataKey="days" fill="#0b6efd" />
          </BarChart>
        </ResponsiveContainer>
      }

      <div className="list-group mt-5">
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
      </div>
    </>
  )
}

export default List;