import React, {useState, useEffect, Fragment} from 'react';
import classes from './AllTasks.module.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllTasks = () => {
    
    const contractorId = '62f830e0ab43e94aa1b86915';

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setIsLoading(true);

        await axios.get(`http://localhost:8000/api/contractor/${contractorId}/tasks`)
            .then((response) => {
                
                setData(response.data);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    const Row = (props) => {
        return(
            <tr>
                <td>{props.entryNumber}</td>
                <td>{props.project}</td>
                <td>{props.date}</td>
                <td>{props.duration}</td>
                <td>{String(props.bilable) === 'true' ? 'Yes' : 'No'}</td>
                <td>{props.productId === undefined ? 'none' : props.productId}</td>
                <td>{props.activity}</td>
                <td>{props.categories}</td>
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
                    <th>Project</th>
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
                                        project={arrayData.projectId.name} 
                                        date={arrayData.date}
                                        duration={arrayData.duration}
                                        bilable={arrayData.bilable}
                                        product={arrayData.productId}
                                        activity={arrayData.activity.activity}
                                        categories={arrayData.categories[0].categorie}
                                        description={arrayData.description}
                                    />
                                )
                            })}
                </tbody>
            </Table>
        </div>
        </div>}
        </Fragment>
    )
}

export default AllTasks;