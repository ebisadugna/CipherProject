import { observer } from "mobx-react-lite";
import { Container, Menu,Dropdown} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function NavBar()
{
    const {userStore:{user,logout}} = useStore()
    return (
        <Menu inverted fixed="top">
            <Container>
            <Menu.Item as={NavLink} to="/" header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}} />
                SecureLand
            </Menu.Item>
            <Menu.Item position='right'>

                <Dropdown pointing='top left' text={user?.username}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout}  text="Logout" icon='power'/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            </Container>
        </Menu>
    )
})