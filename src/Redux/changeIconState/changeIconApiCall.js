import {
    changing_false, changing_true, changing2_true, changing2_false
} from "./changeIconRedux.js";

export const changing_true_Func = () => async (dispatch) => {
    dispatch(changing_true());
};

export const changing_false_Func = () => async (dispatch) => {
    dispatch(changing_false());
};

export const changing2_true_Func = () => async (dispatch) => {
    dispatch(changing2_true());
};

export const changing2_false_Func = () => async (dispatch) => {
    dispatch(changing2_false());
};