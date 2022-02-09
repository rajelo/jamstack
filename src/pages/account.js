import React, { useContext } from "react"
// import { Button } from "@material-ui/core"

import { UserContext } from "../contexts"
import { setUser } from "../contexts/actions"

import Layout from "../components/ui/layout"
import AuthPortal from "../components/auth/AuthPortal"
import SettingsPortal from "../components/settings/SettingsPortal"

export default function Account() {
  const { user } = useContext(UserContext)

  // logged in user needs to have jwt

  return (
    <Layout>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  )
}
