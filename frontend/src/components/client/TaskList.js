import React, {useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import classes from './TaskList.module.css';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
    
    const userId = '62f7f6d788e7d7fc8caf1558';
    const projectId = '6301c34655fe115a2d59772a'

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setIsLoading(true);

        await axios.get(`http://localhost:8000/api/client/${userId}/projects/${projectId}`)
            .then((response) => {
                
                setData(response.data.tasks);
                console.log(response.data.tasks);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    const Row = (props) => {
        
        return(
            <tr>
                <td>{props.entryNumber}</td>
                <td>{props.contractor}</td>
                <td>{props.date}</td>
                <td>{props.duration}</td>
                <td>{props.bilable}</td>
                <td>{props.product}</td>
                <td>{props.activity}</td>
                <td>{props.categorie}</td>
                <td>{props.description}</td>
            </tr>
        )
    }

    return(
        <Fragment>
            {!isLoading && 
                <div className={classes.container}>
                <h1 className={classes.logo}>Tasks</h1>
                    <div className='table-responsive'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Entry#</th>
                            <th>Contractor</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Bilable</th>
                            <th>Product</th>
                            <th>Activity</th>
                            <th>Categorie</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(arrayData => {
                                return(
                                    <Row key={arrayData._id} 
                                        entryNumber={arrayData.entryNumber} 
                                        contractor={arrayData.contractorId} 
                                        date={arrayData.date}
                                        duration={arrayData.duration}
                                        bilable={arrayData.bilable}
                                        product={arrayData.product}
                                        activity={arrayData.activity}
                                        description={arrayData.description}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                    </div>
            </div>}
            {isLoading && 
            <div className={classes.centered}>
                <LoadingSpinner />
            </div>
            }
        </Fragment>
    )
}

export default TaskList;