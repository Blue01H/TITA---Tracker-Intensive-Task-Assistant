import React, {useState, Fragment} from 'react';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './CreateTask.module.css'

const CreateTask = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [projectCode, setProjectCode] = useState('');
    const [duration, setDuration] = useState('');
    const [activity, setActivity] = useState('');
    const [categorie, setCategorie] = useState('');
    const [bilable, setBilable] = useState(false);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState('');

    const contractorId = '62f830e0ab43e94aa1b86915'

    const submitHandler = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        // const loginFormData = new FormData();
        // loginFormData.append('name', name);
        // loginFormData.append('description', description);

        // if(productName && productDescription !== '') {
        //     loginFormData.append('productName', productName);
        //     loginFormData.append('productDescription', productDescription);
        // }

        // console.log(projectCode);
        // console.log(duration);
        // console.log(activity);
        // console.log(categorie);
        // console.log(bilable);
        // console.log(date);
        // console.log(description);
        // console.log(product);


        await axios.post(`http://localhost:8000/api/contractor/${contractorId}/tasks`,{ projectId: projectCode, duration: duration, activity: activity, categorie: categorie, bilable: bilable, date: date, description: description})
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false);
    }
    
    return(
        <Fragment>
        {!isLoading && <div className={classes.container}>
            <h1 className={classes.logo}>Create Task</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.inputContainer}>
                    <div className={classes.singleDiv}>
                        <label htmlFor='projectCode'>Project Code</label>
                        <input type='text' id='projectCode' value={projectCode} onChange={(e) => setProjectCode(e.target.value)}/>
                    </div>
                    <div className={classes.singleDiv}>
                        <label htmlFor='duration'>Duration/Hrs</label>
                        <input type='number' id='duration' value={duration} onChange={(e) => setDuration(e.target.value)}/>
                    </div>
 
                </div>
                <div className={classes.inputContainer}>  
                    <div className={classes.singleDiv}>
                        <label htmlFor='product'>Product</label>
                        <select name="product" id="product" onChange={(e) => setProduct(e.target.value)}>
                            <option value={'None'}>None</option>
                            <option value={'Bumpers'}>Bumpers</option>
                            <option value={'AutoCad'}>AutoCAD</option>
                        </select>
                    </div>
                    <div className={classes.singleDiv}>
                        <label htmlFor='activity'>Activity</label>
                        <select name="activity" id="activity" onChange={(e) => setActivity(e.target.value)}>
                            <option value={'None'}>None</option>
                            <option value={'62f956cc8e08401d6cabb2c4'}>Development</option>
                            <option value={'62f95c76987a40520d9f6666'}>Support</option>
                        </select>
                    </div>
                    
                </div>
                <div className={classes.inputContainer}>
                    <div className={classes.singleDiv}>
                        <label htmlFor='categorie'>Categories</label>
                            <select name="categorie" id="categorie" onChange={(e) => setCategorie(e.target.value)}>
                            <option value={'62f9b40eb4d5df7d580440ec'}>Sales</option>
                            <option value={'62f955752abcc189d1b5421b'}>R&D</option>
                            <option value={'62f9b40eb4d5df7d580440ea'}>Cust</option>
                        </select>
                    </div>
                    <div className={classes.singleDiv}>
                        <label htmlFor='bilable'>Bilable</label>
                        <select name="bilable" id="bilable" onChange={(e) => setBilable(e.target.value)}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <div className={classes.singleDiv}>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                    <div className={classes.singleDiv}>

                    </div>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='description'>Description</label>
                    <textarea type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className={classes.overflow}>
                    <button className={classes.button}>Submit</button>
                </div>
            </form>
        </div>
        }
        {isLoading && 
        <div className={classes.centered}>
            <LoadingSpinner />
        </div>}
       </Fragment>
    )
}

export default CreateTask;