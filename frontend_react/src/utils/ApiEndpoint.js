export const BASE_URL = "http://localhost:8080/TravelBooking";

// Login
export const AUTH__LOGIN = `${BASE_URL}/LoginController`;

// Category
export const PUBLIC__LIST_CATEGORY = `${BASE_URL}/GetListCategory`;


//Tour
export const PUBLIC__LIST_TOUR = `${BASE_URL}/GetAllTourUser`;
export const PUBLIC__TOUR_DETAIL = `${BASE_URL}/GetTourDetail`;
export const ADMIN__CREATE_TOUR = `${BASE_URL}/CreateTour`;
export const ADMIN__UPDATE_TOUR = `${BASE_URL}/UpdateTour`;
export const ADMIN__LIST_TOUR = `${BASE_URL}/GetAllTourAdmin`;
export const ADMIN__DELETE_TOUR = `${BASE_URL}/DeleteTour`;
export const ADMIN__DELETE_CATEGORY = `${BASE_URL}/DeleteCategory`;
export const ADMIN__UPDATE_CATEGORY = `${BASE_URL}/UpdateCategory`;
export const ADMIN__INSERT_CATEGORY = `${BASE_URL}/InsertCategory`;

//Account
export const ACCOUNT__GET_PROFILE = `${BASE_URL}/ViewOneProfile`;
export const ACCOUNT__UPDATE_PROFILE = `${BASE_URL}/UpdateProfile`;
export const ACCOUNT__CREATE = `${BASE_URL}/CreateAccount`;
export const ACCOUNT__CHANGE_PASSWORD = `${BASE_URL}/ChangePassword`;

//Order
export const ORDER__CHECK_OUT = `${BASE_URL}/CheckOutOrder`;
export const USER__LIST_ORDER = `${BASE_URL}/GetListOrderOfUser`;
export const USER__ORDER_DETAIL = `${BASE_URL}/GetOrderDetail`;
export const ADMIN__LIST_ORDER = `${BASE_URL}/GetListOrderOfAdmin`;
export const ADMIN__ORDER_DETAIL = `${BASE_URL}/GetOneOrderOfAdmin`;
