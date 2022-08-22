import { Fragment } from 'react';
import AllTasks from '../components/contractor/AllTasks';
import ContractorData from '../components/contractor/ContractorData';
import CreateTask from '../components/contractor/CreateTask';
import TaskView from '../components/contractor/TaskView';

const Contractor = () => {
    return (
        <Fragment>
            <ContractorData />
            {/* <CreateTask /> */}
            {/* <TaskView /> */}
            {/* <AllTasks />  */}
        </Fragment>
    )
}

export default Contractor;