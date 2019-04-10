import {get} from '../../utils/ApiCaller';
import {PUBLIC__LIST_CATEGORY} from '../../utils/ApiEndpoint';

const getListCategoryRequest = () => ({type: "GET_LIST_CATEGORY_REQUEST"});
const getListCategorySuccess = (payload) => ({type: "GET_LIST_CATEGORY_SUCCESS", payload});
const getListCategoryError = (payload) => ({type: "GET_LIST_CATEGORY_ERROR", payload});

export const getListCategory = () => {
    return async(dispatch) => {
        dispatch(getListCategoryRequest());
        await get(
            PUBLIC__LIST_CATEGORY,
            {},
            {},
            {}
        )
        .then(res => {
            dispatch(getListCategorySuccess(res.data));
        })
        .catch(err => {
            dispatch(getListCategoryError(err));
        })
    }
}

const setTourCountSuccess = (payload) => ({type: "SET_TOUR_COUNT", payload});

export const setTourCount = (tourCount) => {
    return dispatch => {
        dispatch(setTourCountSuccess(tourCount));
    }
}