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
import {fetchTinyUrl} from "../action/tinyAction";

class ShortenArea extends React.Component {

    render() {
        const urlRef = React.createRef();
        const indexRef = React.createRef();

        const onClick = () => {
            let longUrl = urlRef.current.value;
            let index = indexRef.current.value;
            if (index && index.trim().length > 0) {
                index = index.trim();
            }
            if (longUrl && longUrl.trim().length > 0) {
                longUrl = longUrl.trim();
                this.props.onShorten(longUrl, index);
            }
        };

        return (
            <Container>
                <Card>
                    <CardBody>
                        <CardImg variant="top" src="/web.jpg"/>
                        <CardTitle className={"text-center searchTitle"}>Shorten Your URL</CardTitle>
                        <Input placeholder="Input your long URL" innerRef={urlRef}/>

                        <Input placeholder="Customize the URL (Optional)" innerRef={indexRef}/>
                    </CardBody>
                    <CardFooter className={"text-center"}>
                        <Button color="primary" className={"float-center"} onClick={onClick}>Shorten it</Button>
                    </CardFooter>
                </Card>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onShorten: (longUrl, index) => {
            console.log(longUrl);
            console.log(index);
            dispatch(fetchTinyUrl(longUrl, index));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ShortenArea)