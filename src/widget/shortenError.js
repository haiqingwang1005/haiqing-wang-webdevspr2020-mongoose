import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../styles/app.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

class ShortenError extends React.Component {
    render() {
        return (
            <Container className={"book-error-container"}>
                <Row>
                    <Col className={"col-xs-12 text-center"}>
                        <FontAwesomeIcon icon={faExclamationCircle} size={"lg"}/>{' '}
                        {this.props.words}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ShortenError;