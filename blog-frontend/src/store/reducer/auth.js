import * as actionTypes from '../actionTypes';


export const initialState = {
    user: null,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                user: null,
                error: action.error
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                error: null
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.REMOVE_ERROR: {
            return {
                ...state,
                error: null
            }
        }

        case actionTypes.SET_AUTH_DATA: {
            return {
                ...state,
                user: action.user
            }
        }

        default:
            return state;
    }
};

export default reducer;