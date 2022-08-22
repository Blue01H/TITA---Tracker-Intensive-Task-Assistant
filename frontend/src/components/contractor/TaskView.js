import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './TaskView.module.css';

const TaskView = () => {

    const contractorId = '62f830e0ab43e94aa1b86915';
    const taskId = '6302c35f0db82ea272a88675'

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setIsLoading(true);

        await axios.get(`http://localhost:8000/api/contractor/${contractorId}/tasks/${taskId}`)
            .then((response) => {
                
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);

            }).catch((err) => {
                setIsLoading(false);
                console.log(err);
        });
    }

    const deleteHandler = async (e) => {
        
        e.preventDefault();
        setIsLoading(true);

        await axios.delete(`http://localhost:8000/api/contractor/${contractorId}/projects/${taskId}`)
            .then(() => {
                
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    return(
        <Fragment>
        {!isLoading && <div className={classes.container}>
            <h1 className={classes.logo}>TaskView</h1>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='projectCode'>Project Code</label>
                    <input type='text' id='projectCode' placeholder={data.projectId} disabled/>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='duration'>Duration/Hrs</label>
                    <input type='number' id='duration' placeholder={data.duration}/>
                </div>
            </div>
            <div className={classes.inputContainer}>  
                <div className={classes.singleDiv}>
                    <label htmlFor='product'>Product</label>
                    <select name="product" id="product" defaultValue={data.product}>
                        <option value={data.product}>{data.product === undefined ? 'None' : data.product}</option>
                        <option>Bumpers</option>
                        <option>AutoCAD</option>
                    </select>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='activity'>Activity</label>
                    <select name="activity" id="activity" defaultValue={data.activity}>
                        <option value={data.activity}>{data.activity}</option>
                        <option value={'Support'}>Support</option>
                        <option value={'Release'}>Release</option>
                    </select>
                </div>            
            </div>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='categorie'>Categories</label>
                        <select name="categorie" id="categorie" defaultValue={'None'}>
                        <option value={'None'}>None</option>
                        <option value={'R&D'} >R&D</option>
                        <option value={'Cust'} >Cust</option>
                    </select>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='bilable'>Bilable</label>
                    <select name="bilable" id="bilable">
                        <option value={data.bilable}>{String(data.bilable) === 'true' ? 'Yes' : 'No'}</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
            </div>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='date'>Date</label>
                    <input type='date' id='date'/>
                </div>
                <div className={classes.singleDiv}>
                </div>
            </div>
            <div className={classes.singleDiv}>
                <label htmlFor='description'>Description</label>
                <textarea type='text' id='description' placeholder={data.description}/>
            </div>
            <div className={classes.buttonDiv}>
                <button className={classes.delete} onClick={deleteHandler}>Delete Project</button>
                <button className={classes.modify}>Modify Project</button>
            </div>
        </div>
        }
        {isLoading && <div className={classes.centered}>
            <LoadingSpinner />
        </div>}
        </Fragment>
    )
}

export default TaskView;