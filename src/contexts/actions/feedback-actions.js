import { SET_SNACKBAR } from "./action-types"

// create action creator
export const setSnackbar = ({ status, message, open }) => ({
  type: SET_SNACKBAR,
  payload: { status, message, open },
})
