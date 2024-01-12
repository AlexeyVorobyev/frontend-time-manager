import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {actions as userActions} from "../store/user/user.slice";


const rootActions = {
    ...userActions
}
export const useActions = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(rootActions,dispatch),[dispatch])
}