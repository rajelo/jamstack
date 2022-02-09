import React, { useReducer, createContext } from "react"
import { Snackbar } from "@material-ui/core"
import { setSnackbar } from "../actions"
import feedbackReducer from "../reducers/feedback-reducer"

export const FeedbackContext = createContext()
const FeedbackProvider = FeedbackContext.Provider

export function FeedbackWrapper({ children }) {
  // dispatchFeedback is to send off our action
  // feedback represent our actual store
  const [feedback, dispatchFeedback] = useReducer(feedbackReducer, {
    open: false,
    backgroundColor: "",
    message: "",
  })

  return (
    <FeedbackProvider value={{ feedback, dispatchFeedback }}>
      {children}
      <Snackbar
        open={feedback.open}
        message={feedback.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // automatically calls onClose
        autoHideDuration={6000}
        onClose={() => dispatchFeedback(setSnackbar({ open: false }))}
        ContentProps={{
          style: {
            backgroundColor: feedback.backgroundColor,
            fontSize: "1.25rem",
          },
        }}
      />
    </FeedbackProvider>
  )
}
