import { CHANGE_LANGUAGE } from '../actions';

const lang = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return Object.assign({}, state, { current: action.lang });

    default:
      return state;
  }
};

export default lang;
