import React from "react";
import {connect} from "react-redux";
import {Card, CardTitle, CardBody, Container, CardText} from "reactstrap";
import ShortenError from "./shortenError";
import ShortenSpinner from "./shortenSpinner";

class ShortenResult extends React.Component {
    render() {
        if (!this.props.start) {
            return <div/>
        }

        if (this.props.error) {
            return <ShortenError words={this.props.error}/>
        }
        if (this.props.loading) {
            return <ShortenSpinner/>
        }

        return (
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>Tiny URL:</CardTitle>
                        <CardText>
                            <a href={this.props.tinyUrl}>{this.props.tinyUrl}</a>
                        </CardText>
                    </CardBody>
                </Card>
            </Container>
        )
    }

}

function mapStateToProps(state, props) {
    return {
        tinyUrl: state.tiny.tinyUrl,
        start: state.tiny.start,
        loading: state.tiny.loading,
        error: state.tiny.error,
    }
}

export default connect(
    mapStateToProps,
    null
)(ShortenResult)