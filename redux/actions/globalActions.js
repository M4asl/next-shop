import { CLEAR_ERRORS } from "../constants/globalConstants";

const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export { clearErrors };
