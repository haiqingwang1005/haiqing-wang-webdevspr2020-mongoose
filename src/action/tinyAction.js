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

function requestUpdateTinyUrl(shortenKey) {
    return {
        type: 'REQUEST_UPDATE_TINY_URL',
        shortenKey: shortenKey,
    };
}

function receiveUpdateTinyUrl() {
    return {
        type: 'RECEIVE_UPDATE_TINY_URL',
    };
}

function receiveUpdateTinyUrlError() {
    return {
        type: 'RECEIVE_UPDATE_TINY_URL_ERROR',
    };
}

export function updateTinyUrl(longUrl, index) {
    return (dispatch) => {
        console.log('updateTinyUrl');
        dispatch(requestUpdateTinyUrl(index));
        return Axios.put(`/api/shorten/${index}`, {newUrl: longUrl})
            .then(
                response => {
                    console.log(response);
                    dispatch(receiveUpdateTinyUrl());
                }
            )
            .catch(error => {
                console.log(error);
                dispatch(receiveUpdateTinyUrlError())
            });
    }
}

export function fetchTinyUrl(longUrl, index) {
    return (dispatch) => {
        dispatch(requestTinyUrl(longUrl));
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