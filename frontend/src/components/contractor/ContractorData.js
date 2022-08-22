import React, {useState, useEffect, Fragment} from 'react';
import classes from './ContractorData.module.css';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

const ContractorData = () => {

    useEffect(() => {
        fetchData();
    },[])

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const contractorId = '62f830e0ab43e94aa1b86915';
    
    const fetchData = async () => {

        setIsLoading(true);

        return await axios.get(`http://localhost:8000/api/contractor/${contractorId}`)
            .then((response) => {
                
                setData(response.data.contractor);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }
    
    return(
        <Fragment>
        {!isLoading && <div className={classes.container}>
            <h1 className={classes.logo}>Contractor Data</h1>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' value={data.firstname} disabled/>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' value={data.lastname} disabled/>
                </div>
            </div>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='gender'>Gender</label>
                    <input type='text' id='gender' value={data.gender} disabled/>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='birthday'>Birthday</label>
                    <input type='text' id='birthday' value={data.birthday} disabled/>
                </div>
            </div>
            <div className={classes.inputContainer}>
                <div className={classes.singleDiv}>
                    <label htmlFor='country'>Country of Residence</label>
                    <input type='text' id='country' value={data.country} disabled/>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='status'>Status</label>
                    <input type='text' id='status' value={String(data.active) === 'true' ? 'Active' : 'Inactive'} disabled/>
                </div>
            </div>
        </div>
        }
        {isLoading && 
        <div className={classes.centered}>
            <LoadingSpinner />    
        </div>}
        </Fragment>
    )
}

export default ContractorData;