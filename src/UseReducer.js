
const actionTypes = {
  valueChange: 'CHECK',
  check: 'VALUE_CHANGE',
  delete: 'DELETE',
  error: 'ERROR',
  confirm: 'CONFIRM',
  cancel: 'CANCEL',
}
const initialState = {
  error: false,
  value: '',
  loading: false,
  delete: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  [actionTypes.valueChange]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    delete: true,
    loading: false,
    error: false,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.confirm]: {
    ...state,
    confirmed: true,
  },
  [actionTypes.cancel]: {
    ...state,
    delete: false,
    confirmed: false,
    value: '',
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { reducer, initialState, actionTypes }