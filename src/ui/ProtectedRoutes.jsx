import styled from "styled-components"
import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function ProtectedRoutes({children}) {
    const navigate = useNavigate()
    //1. Load authenticated users
    const {user, isLoading, isAuthenticated} = useUser()

    

    //2. If no authenticated user, redirect to login page
    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate('/login')  //If not authenticated, redirect to login page
    },[isAuthenticated,isLoading,navigate])

    //3. While loading, show Spinner
    if(isLoading) return <FullPage><Spinner/></FullPage> 


    //4.If there is a use, render app


 if(isAuthenticated) return children
}
