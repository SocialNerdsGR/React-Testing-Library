import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const setValue = (event) => {
    const { name: fieldName, value } = event.target;
    const newState = {...state, [fieldName]: value};
    setState(newState);
  };

  const clearForm = () => {
    const empty = Object.keys(state).reduce((currentState, key) => {
      currentState[key] = '';
      return currentState;
    }, {})
    setState(empty);
  };

  return { clearForm, setValue, state };
};
