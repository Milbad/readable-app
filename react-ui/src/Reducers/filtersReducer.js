export const filterReducer = (state = 'SHOW_ALL', action) => {
  const {filter} = action
  switch (action.type) {
    case 'SET_FILTER':
      return filter
    default:
      return state
  }
}
