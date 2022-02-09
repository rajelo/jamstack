import { SET_USER } from "../actions/action-types"

export default function userReducer(state, action) {
  const { user } = action.payload

  // first I create copy of my current state
  let newState = { ...state }

  switch (action.type) {
    case SET_USER:
      // I want to save user in localStorage, for example when he refreshes the page, but not guest
      if (user.username === "Guest") {
        localStorage.removeItem("user")
      } else {
        localStorage.setItem("user", JSON.stringify(user))
      }

      newState = user

      // whatever I return in reducer will become a new state in my application
      return newState

    default:
      return state
  }
}
