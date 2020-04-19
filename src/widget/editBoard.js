import * as React from "react";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardFooter,
    CardTitle,
    Container,
    Input,
    Alert
} from "reactstrap";
import '../styles/app.css';
import {connect} from 'react-redux';
import NotFound from "./notFound";
import ShortenSpinner from "./shortenSpinner";
import Axios from "axios";
import ShortenError from "./shortenError";
import {updateTinyUrl} from "../action/tinyAction";

class UpdateResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.updateStart) {
            return <div/>
        }
        if (this.props.updateLoading) {
            return <ShortenSpinner/>
        }
        if (this.props.updateComplete) {
            return (
                <Alert color="success">
                    Update Success
                </Alert>
            );
        }
        if (this.props.updateError) {
            return <ShortenError words={"There is an error editing URL."}/>
        }
        return super.render();
    }
}
class EditBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            longUrl: null,
        };
    }
    componentDidMount() {
        fetch(`/api/shorten/${this.props.shortenKey}`)
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    console.log(result);
                    let longUrl;
                    if (result.status === 404) {
                        longUrl = null;
                    } else {
                        longUrl = result.original;
                    }
                    this.setState({
                        isLoaded: true,
                        longUrl
                    })
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            );
    }

    render() {
        const inputRef = React.createRef();

        const onClickEdit = () => {
            const newURL = inputRef.current.value;

            console.log(newURL);
            if (newURL && newURL.trim().length > 0) {
                this.props.onEdit(newURL, this.props.shortenKey);
            }
        };

        const onClickDelete = () => {

            return Axios.delete(`/api/shorten/${this.props.shortenKey}`)
                .then(
                    response => {
                        console.log(response);
                        window.location.href = '/';
                    }
                )
                .catch(error => {
                    console.log(error);
                    console.alert('Delete Fail');
                });
        };

        if (!this.props.edit || this.props.edit !== 'edit') {
            return <NotFound words={"Content Not Found"}/>
        }
        if (!this.state.isLoaded) {
            return <ShortenSpinner/>
        }
        console.log(this.state.longUrl);
        if (!this.state.longUrl) {
            return <NotFound words={"Cannot found the tiny url"}/>
        }
        return (
            <Container>
                <Card>
                    <CardBody>
                        <CardImg variant="top" src="/alphabet.png"/>
                        <CardTitle className={"text-center searchTitle"}>Edit Your Shortened URL</CardTitle>
                        <Input placeholder="Edit your URL" innerRef={inputRef} defaultValue={this.state.longUrl}/>
                    </CardBody>
                    <CardFooter className={"text-center"}>
                        <Button color="primary" className={"float-center"} onClick={onClickEdit}>Edit</Button> {' '}
                        <Button color="danger" className={"float-center"} onClick={onClickDelete}>Delete</Button>
                    </CardFooter>
                </Card>
                <UpdateResult updateError={this.props.updateError}
                              updateStart={this.props.updateStart}
                              updateComplete={this.props.updateComplete}
                              updateLoading={this.props.updateLoading}/>
            </Container>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        updateError: state.tiny.updateError,
        updateStart: state.tiny.updateStart,
        updateComplete: state.tiny.updateComplete,
        updateLoading: state.tiny.updateLoading,
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        onEdit: (newUrl, shortenKey) => {
            dispatch(updateTinyUrl(newUrl, shortenKey));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBoard)