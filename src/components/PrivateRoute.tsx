import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"
import { RootState } from "../redux/store"

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return (
        <Route {...rest} render={(props: any) => isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}