import { ADD_ANSWER, } from './answers.types';

const initialState = {
    answers: [],
    loading: true,

};

export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload],
                loading: false,
            };
        default:
            return state;
    }
}
