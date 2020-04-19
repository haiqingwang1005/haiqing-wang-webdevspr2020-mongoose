export default function tinyReducer(state =
                                        {
                                            longUrl: undefined,
                                            tinyUrl: undefined,
                                            loading: false,
                                            start: false,
                                            error: undefined,
                                        },
                                    action) {
    switch (action.type) {
        case 'REQUEST_TINY_URL':
            return Object.assign({}, state, {start: true, loading: true, longUrl: action.longUrl, error: undefined});
        case 'RECEIVE_TINY_URL':
            return Object.assign({}, state, {start: true, loading: false, tinyUrl: action.tinyUrl, error: undefined});
        case 'RECEIVE_TINY_URL_ERROR':
            return Object.assign({}, state, {start: true, loading: false, error: action.error});
        default:
            return state;
    }
}