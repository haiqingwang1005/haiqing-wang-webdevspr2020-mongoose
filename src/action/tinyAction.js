import Axios from 'axios';

function requestTinyUrl(longUrl) {
    return {
        type: 'REQUEST_TINY_URL',
        longUrl: longUrl
    };
}

function receiveTinyUrl(tinyUrl) {
    return {
        type: 'RECEIVE_TINY_URL',
        tinyUrl: tinyUrl,
    };
}

function receiveError(error) {
    return {
        type: 'RECEIVE_TINY_URL_ERROR',
        error: error,
    };
}

export function fetchTinyUrl(longUrl, index) {
    return (dispatch) => {
        dispatch(requestTinyUrl());
        console.log(`longUrl ${longUrl}`);
        return Axios.post(`/api/shorten`, {original: longUrl, index: index})
            .then(
                response => {
                    console.log('receive tiny url response');
                    console.log(response);
                    dispatch(receiveTinyUrl(response.data.tinyUrl))
                })
            .catch(error => {
                console.log('fetchTinyUrl error');
                console.log(error.response.data.message);

                let errMsg = 'some error happen';
                if (error.response && error.response.data && error.response.data.message) {
                    errMsg = error.response.data.message;
                }
                dispatch(receiveError(errMsg))
            });
    }
}