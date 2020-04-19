import React from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    NavbarToggler
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";

export default class NavigationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
    }

    render() {
        const toggle = () => {
            this.setState({collapsed: !this.state.collapsed});
        };

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">
                        <FontAwesomeIcon icon={faBook}/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2"/>
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/shorten">Shorten</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

/*
                            <NavItem>
                                <NavLink href="/edit">Edit</NavLink>
                            </NavItem>
 */