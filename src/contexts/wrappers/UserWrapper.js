import React, { useReducer, createContext, useEffect } from "react"
import axios from "axios"
import userReducer from "../reducers/user-reducer"
import { setUser } from "../actions"

export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
  const defaultUser = { username: "Guest" }

  const isDefined = typeof window !== "undefined"

  const storedUser =
    isDefined && JSON.parse(localStorage.getItem("user")) !== null
      ? JSON.parse(localStorage.getItem("user"))
      : defaultUser

  //   storedUser = JSON.parse(localStorage.getItem("user"))

  const [user, dispatchUser] = useReducer(
    userReducer,
    storedUser || defaultUser
  )

  // to get a fresh copy of state of user profile
  useEffect(() => {
    // 3s time out for loading the page when stored user
    if (storedUser !== defaultUser) {
      setTimeout(() => {
        // this is authenticated request with jwt
        axios
          .get(process.env.GATSBY_STRAPI_URL + "/users/me", {
            headers: {
              // I need Authorization header and bearer of jwt
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          })
          .then(respone => {
            dispatchUser(
              setUser({
                ...respone.data,
                jwt: storedUser.jwt,
                onboarding: true,
              })
            )
          })
          .catch(error => {
            console.error(error)
            dispatchUser(setUser(defaultUser))
          })
      }, 3000)
    }
  }, [])

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  )
}
