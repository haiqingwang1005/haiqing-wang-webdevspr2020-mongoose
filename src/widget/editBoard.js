import * as React from "react";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardFooter,
    CardTitle,
    Container,
    Input
} from "reactstrap";
import '../styles/app.css';
import {connect} from 'react-redux';
import NotFound from "./notFound";
import ShortenSpinner from "./shortenSpinner";

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

        const onClick = () => {
            const keywords = inputRef.current.value;
            if (keywords && keywords.trim().length > 0) {
                this.props.onEdit(keywords);
            }
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
                        <Button color="primary" className={"float-center"} onClick={onClick}>Edit</Button> {' '}
                        <Button color="danger" className={"float-center"} onClick={onClick}>Delete</Button>
                    </CardFooter>
                </Card>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onEdit: (keywords) => {
            console.log();
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(EditBoard)