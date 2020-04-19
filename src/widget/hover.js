import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

class Hover extends React.Component {
    render() {
        let direction = 'right';
        if (this.props.direction) {
            direction = this.props.direction;
        }
        return (
            <span className={"book-hover"}>
                <OverlayTrigger key={direction} placement={direction} overlay={
                    <Tooltip id={`tooltip-${direction}}`}>
                        {this.props.words}
                    </Tooltip>
                }>
                    {this.props.children}
                </OverlayTrigger>
            </span>
        );
    }
}

export default Hover;