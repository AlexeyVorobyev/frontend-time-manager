import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store/store'
import {getTokensAndExpiry} from "./authTokenAndExpiry.ts"

export const useLoginStatus = () => {
    const checkStatus = useCallback(() => {
        if (getTokensAndExpiry().refreshExpiry) {
            if (new Date(getTokensAndExpiry().refreshExpiry as string).getTime() < new Date().getTime()) {
                console.log('here')
                localStorage.clear()
                return false
            }
        }
        return (
            Boolean(getTokensAndExpiry().accessExpiry) || Boolean(getTokensAndExpiry().refreshToken)
        )
    },[localStorage])

    const [loginStatus,setLoginStatus] = useState<boolean>(checkStatus())
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        setLoginStatus(checkStatus())
    }, [user.isAuth])

    return loginStatus
}

