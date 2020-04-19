import React from "react";
import PageContainer from "../widget/pageContainer";
import ShortenArea from "../widget/shortenArea";
import ShortenResult from "../widget/shortenResult";

class ShortenPage extends React.Component {
    render() {
        return (
            <PageContainer>
                <ShortenArea/>
                <ShortenResult/>
            </PageContainer>
        );
    }
}

export default ShortenPage;