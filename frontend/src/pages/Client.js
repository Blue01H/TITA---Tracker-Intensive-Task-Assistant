import { Fragment } from "react";
import ClientData from "../components/client/ClientData";
import CreateProject from '../components/client/CreateProject';
import ProjectDisplay from "../components/client/ProjectDisplay";
import TaskList from "../components/client/TaskList";
import AllProjects from "../components/client/AllProjects";
import Menu from "../components/client/Menu";

const Client = () => {
        
    return (
        <Fragment>
            <Menu/>
            {/* <ProjectDisplay /> */}
            {/* <CreateProject /> */}
            <ClientData />
            {/* <AllProjects /> */}
            {/* <TaskList />  */}
        </Fragment>
    )
}

export default Client;