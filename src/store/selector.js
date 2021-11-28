export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  // return actions.some((action) => get(state, `loading.${action}`));
  return actions.some((action) => state.loading[action]);
};

export const createErrorMessageSelector = (actions) => (state) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  const errors = actions.map((action) => state.error[action]);
  
  if (errors && errors[0]) {
    return errors[0];
  }
  return "";
};
