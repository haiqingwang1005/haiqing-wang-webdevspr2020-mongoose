export default function tinyReducer(state =
                                        {
                                            longUrl: undefined,
                                            tinyUrl: undefined,
                                            loading: false,
                                            start: false,
                                            error: undefined,

                                            updateStart: false,
                                            updateComplete: false,
                                            updateError: false,
                                            updateLoading: false
                                        },
                                    action) {
    switch (action.type) {
        case 'REQUEST_TINY_URL':
            return Object.assign({}, state, {start: true, loading: true, longUrl: action.longUrl, error: undefined});
        case 'RECEIVE_TINY_URL':
            return Object.assign({}, state, {start: true, loading: false, tinyUrl: action.tinyUrl, error: undefined});
        case 'RECEIVE_TINY_URL_ERROR':
            return Object.assign({}, state, {start: true, loading: false, error: action.error});
        case 'REQUEST_UPDATE_TINY_URL':
            return Object.assign({}, state, {updateStart: true, updateLoading: true, updateError: false, updateComplete: false});
        case 'RECEIVE_UPDATE_TINY_URL':
            return Object.assign({}, state, {updateError: false, updateLoading: false, updateComplete: true});
        case 'RECEIVE_UPDATE_TINY_URL_ERROR':
            return Object.assign({}, state, {updateError: true, updateLoading: false});
        default:
            return state;
    }
}