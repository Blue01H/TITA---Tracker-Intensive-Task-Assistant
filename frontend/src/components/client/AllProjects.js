import { useState, useEffect, Fragment } from 'react';
import classes from './AllProjects.module.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import LoadingSpinner from '../UI/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllProjects = () => {

    const userId = '62f7f6d788e7d7fc8caf1558';

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setIsLoading(true);

        await axios.get(`http://localhost:8000/api/client/${userId}/projects`)
            .then((response) => {
                
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);

            }).catch((err) => {
                console.log(err);
        });
    }

    const Row = (props) => {
        
        console.log(props.active);
        
        return(
            <tr>
                <td>{props.name}</td>
                <td>{props._id}</td>
                <td>{props.active === 'true' ? 'active' : 'inactive'}</td>
            </tr>
        )
    }

    return(
        <Fragment>
            {!isLoading && 
                <div className={classes.container}>
                    <h1 className={classes.logo}>Projects</h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Project Code</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(arrayData => {
                                return(
                                <Row key={arrayData._id} name={arrayData.name} _id={arrayData._id} status={arrayData.active}/>
                            )
                            })}
                        </tbody>
                    </Table>
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

export default AllProjects;