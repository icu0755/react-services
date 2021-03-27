import { ADD_POST } from '../actions/postsActions';

const initialState = {
    posts: [],
};

export default function postsReducer(state = initialState, action) {
    console.log(action, state);
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.post],
            }
        default:
            return state;
    }
}