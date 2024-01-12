import React from "react";
import {SkeletonWrapper} from "./components/skeleton/SkeletonWrapper";
import {RouterComponent} from "./components/Router/RouterComponent";
import {useLoginStatus} from "./components/functions/useLoginStatus";
import {routesList} from "./components/Router/routesList";
import {routesAuthList} from "./components/Router/routesAuthList.tsx"

const App: React.FC = () => {

    const loginStatus = useLoginStatus()

    return (
        <>
            {loginStatus ?
                <SkeletonWrapper>
                    <RouterComponent routesList={routesList}/>
                </SkeletonWrapper> : <RouterComponent routesList={routesAuthList}/>
            }
        </>
    )
}

export default App
