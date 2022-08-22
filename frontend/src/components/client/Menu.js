import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Menu.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = (props) => {

    return(
        <div className={classes.container}>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary">Profile</Button>
                <Button variant="primary">Projects</Button>
                <Button variant="primary">New Project</Button>
            </ButtonGroup>
        </div>
    )
}

export default Menu;