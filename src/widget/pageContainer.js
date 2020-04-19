import React from "react";
import NavigationMenu from "./nav";

export default class PageContainer extends React.Component {
    render() {
        return (
            <div>
                <NavigationMenu/>
                {this.props.children}
            </div>
        );
    }
}