import React from "react";
import PageContainer from "../widget/pageContainer";
import EditBoard from "../widget/editBoard";

export default class EditPage extends React.Component {
    render() {
        const params = this.props.match.params;
        const shortenKey = params.shortenKey;
        const edit = params.edit;
        return (
            <PageContainer>
                <EditBoard edit={edit} shortenKey={shortenKey}/>
            </PageContainer>
        );
    }
}