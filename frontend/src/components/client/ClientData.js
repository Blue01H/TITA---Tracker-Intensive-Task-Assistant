import { Fragment, useEffect, useState } from 'react';
import classes from './ClientData.module.css';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

const ClientData = () => {

    useEffect(() => {
        fetchData();
    },[])

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const userId = '62f7f6d788e7d7fc8caf1558';
    
    const fetchData = async () => {

        setIsLoading(true);

        return await axios.get(`http://localhost:8000/api/client/${userId}`)
            .then((response) => {
                
                setData(response.data.client);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    return(
        <Fragment>
            {isLoading && 
                <div className={classes.centered}>
                     <LoadingSpinner />
                </div>
            }
            {!isLoading && 
                <div className={classes.container}>
                    <h1 className={classes.clientLogo}>Client - {data.name || 'error'}</h1>
                    <div className={classes.divContainer}>
                        <div className={classes.dobleDiv}>
                            <div className={classes.singleDiv}>
                                <label htmlFor='city'>City</label>
                                <input type='text' id='city' value={data.city || 'error'} disabled/>
                            </div>
                            <div className={classes.singleDiv}>
                                <label htmlFor='country'>Country</label>
                                <input type='text' id='country' value={data.country || 'error'} disabled/>
                            </div>
                        </div>
                        <div className={classes.dobleDiv}>
                            <div className={classes.singleDiv}>
                                <label htmlFor='state'>State</label>    
                                <input type='text' id='state' value={data.state || 'error'} disabled/>
                            </div>
                            <div className={classes.singleDiv}>
                                <label htmlFor='industryCode'>Industry Code</label>
                                <input type='number' id='industryCode' value={data.industryCode || 'error'} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default ClientData;