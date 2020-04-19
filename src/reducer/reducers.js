import { combineReducers } from 'redux'
import tinyReducer from "./tinyReducers";

const rootReducer = combineReducers({
    tiny: tinyReducer,
});
export default rootReducer;