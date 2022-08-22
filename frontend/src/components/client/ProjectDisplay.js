import classes from './ProjectDisplay.module.css';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProjectDisplay = () => {

    const stat = true;

    const userId = '62f7f6d788e7d7fc8caf1558';
    const projectId = '6301c34655fe115a2d59772a'

    const [status, setStatus] = useState(stat);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setIsLoading(true);

        await axios.get(`http://localhost:8000/api/client/${userId}/projects/${projectId}`)
            .then((response) => {
                
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    const deleteHandler = async (e) => {
        
        e.preventDefault();
        console.log('pressed');
        setIsLoading(true);

        await axios.delete(`http://localhost:8000/api/client/${userId}/projects/${projectId}`)
            .then(() => {
                
                console.log('delete')
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    const projectStatusHandler = (e) => {
        e.preventDefault();
        
        if(status) {
            setStatus(false)
        } else {
            setStatus(true)
        }
    }

    return(
        <Fragment>
        {!isLoading && 
        <div className={classes.container}>
            <h1 className={classes.logo}>Project - {data.name}</h1>
            <div className={classes.dataContainer}>
                <div className={classes.singleDiv}>
                    <label className={classes.label} htmlFor='projectDescription'>Product Description</label>
                    <textarea type='text' id='projectDescription' value={data.description} disabled/>
                </div>
                <div className={classes.inputContainer}>
                        <div className={classes.singleDiv}>
                            <label htmlFor='productCode'>Project Code</label>    
                            <input type='text' id='productCode' value={data._id} disabled/>
                        </div>
                        <div className={classes.singleDiv}>
                            <label htmlFor='projectStatus'>Project Status</label>    
                            <button onClick={projectStatusHandler} className={status ? classes.active : classes.inactive} id='projectStatus'>{status ? "Active" : "Inactive"}</button>
                        </div>
                </div>
            </div>
            <div className={classes.buttonDiv}>
                <button className={classes.delete} onClick={deleteHandler}>Delete Project</button>
                <button className={classes.modify}>Modify Project</button>
            </div>
        </div>
        }
        {isLoading && 
        <div className={classes.centered}>
            <LoadingSpinner />
        </div>
        }
        </Fragment>
    )
}

export default ProjectDisplay;