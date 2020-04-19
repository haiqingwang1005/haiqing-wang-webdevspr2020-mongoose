import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import '../styles/app.css';

class NotFound extends React.Component {
    render() {
        return (
            <Container className={"book-error-container"}>
                <Row>
                    <Col className={"col-xs-12 text-center"}>
                        <FontAwesomeIcon icon={faTimesCircle} size={"lg"}/>{' '}
                        {this.props.words}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NotFound;