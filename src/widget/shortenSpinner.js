import React from 'react';
import {Col, Container, Row, Spinner} from 'reactstrap';
import '../styles/app.css';

class ShortenSpinner extends React.Component {
    render() {
        return (
            <Container className={"book-error-container"}>
                <Row>
                    <Col className={"col-xs-12 text-center"}>
                        <Spinner type="grow" color="warning"/>
                        <Spinner type="grow" color="danger"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ShortenSpinner;