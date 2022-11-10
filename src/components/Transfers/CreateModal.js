/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function CreateModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useAuth();
  const { setOpenCreateModal, setReload } = props;
  const [projects, setProjects] = useState();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenCreateModal(false);
    }
  }

  useEffect(() => {
    getProjects()
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

  function onSubmit(data) {
    const uid = v4();
    const storageRef = ref(storage, `gs://mlavtools-dev.appspot.com/files/${ uid }`);
    const uploadTask = uploadBytesResumable(storageRef, data.file[0]);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          createTransfer(uid, data.name, data.project, downloadURL, data.version, data.phase);
        });
      }
    );
  }

  async function createTransfer(id, name, project, fileUrl, version, phase) {
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "transfers", id), {
      id: id, 
      name: name,
      userId: currentUser.uid,
      projectId: project,
      fileUrl: fileUrl,
      version: version ? version : "",
      phase: phase ? phase : "",
      createdAt: createdAt
    });
    setOpenCreateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Ajouter un fichier</h4>
        <hr />
          <form>
            <div className="row mt-3">
              <div className="col-12">
                <label htmlFor="name" className="form-label">Nom du fichier</label>
                <input 
                  type="text"
                  id="name"
                  className={ `form-control text-bg-dark ${ errors.name && "is-invalid border-danger" }` }
                  placeholder="Plan masse"
                  { ...register("name", { required: true }) }
                />
                { errors.name && <div className="form-text text-danger">Veuillez renseigner un nom de fichier</div> }
              </div>
              <div className="col-12 mt-3">
                <label className="form-label">Projet</label>
                <select 
                  {...register("project", { required: true })}
                  className={`form-control text-bg-dark ${ errors.project && "is-invalid" }`}
                  placeholder="Sélection"
                >
                  <option value="">Veuillez sélectionner un projet</option>
                  { 
                    projects && 
                    projects.map(project => (
                      <option key={ project.id } value={ project.id }>{ project.acronym } - { project.name }</option>
                    ))
                  }
                </select>
                { errors.project && <div className="form-text text-danger">Veuillez choisir un projet</div> }
              </div>
              <div className="col-12 mt-3">
              <label className="form-label">Fichier</label>
              <input 
                type="file"
                { ...register("file", { required: true }) }
                className={`form-control text-bg-dark border-light ${ errors.file && "is-invalid" }`}
              />
              { errors.file && <div className="form-text text-danger">Veuillez choisir un fichier</div> }
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="version" className="form-label">Indice</label>
                <input 
                  type="text"
                  id="version"
                  className={ `form-control text-bg-dark ${ errors.version && "is-invalid border-danger" }` }
                  placeholder="A"
                  { ...register("version") }
                />
                { errors.version && <div className="form-text text-danger">Veuillez renseigner un indice de version</div> }
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="phase" className="form-label">Phase</label>
                <input 
                  type="text"
                  id="phase"
                  className={ `form-control text-bg-dark ${ errors.phase && "is-invalid border-danger" }` }
                  placeholder="APS"
                  { ...register("phase") }
                />
                { errors.phase && <div className="form-text text-danger">Veuillez renseigner une phase</div> }
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(onSubmit) } type="submit">Ajouter un nouveau fichier</button>
          </form>
      </div>
    </div>
  )
};

export default CreateModal;