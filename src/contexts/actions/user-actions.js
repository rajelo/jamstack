import { SET_USER } from "./action-types"

// action creator
export const setUser = user => {
  // actual action
  return {
    type: SET_USER,
    payload: { user },
  }
}
