const initialState = {
  listCategory: [],
  tourCount: 0,
  loading: true,
  err: false
};

const setTourCount = (state, payload) => {
  if (payload) {
    state.tourCount = payload;
  } else {
    state.tourCount = 0;
  }
  return { ...state };
};

const msgRequest = state => {
  state.loading = true;

  return { ...state };
};

const msgError = state => {
  state.loading = false;
  state.err = true;

  return { ...state };
};

const setListCategory = (state, payload) => {
  if (payload) {
    state.listCategory = payload;
  }
  state.loading = false;

  return { ...state };
};

export const headerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_LIST_CATEGORY_REQUEST":
      return msgRequest(state);
    case "GET_LIST_CATEGORY_SUCCESS":
      return setListCategory(state, payload);
    case "GET_LIST_CATEGORY_ERROR":
      return msgError(state);
    case "SET_TOUR_COUNT":
      return setTourCount(state, payload);
    default:
      return state;
  }
};
