import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";

export enum EUsePageStateMode {
    queryString = 'QUERY_STRING',
    sessionStorage = 'SESSION_STORAGE',
    localStorage = 'LOCAL_STORAGE',
    noStorage = 'NO_STORAGE'
}

type TServerSideOptions = Map<string, any>

interface IProps {
    varsBehaviorMap?: (params: any) => any
    mode?: EUsePageStateMode.queryString | EUsePageStateMode.sessionStorage | EUsePageStateMode.localStorage | EUsePageStateMode.noStorage,
    storageKey?: string
    defaultValue?: TServerSideOptions
}

const DEBUG = true
const DEBUG_PREFIX = 'USE_PAGE_STATE'

const replacer = (key: string, value: any) => {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        }
    } else {
        return value
    }
}
const reviver = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value)
        }
    }
    return value
}

export const usePageState = ({
                                 varsBehaviorMap,
                                 mode = EUsePageStateMode.queryString,
                                 storageKey = 'pageState',
                                 defaultValue = new Map([]) as Map<string, any>
                             }: IProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [processedParams, setProcessedParams] = useState<any>(null)

    const initialSetServerSideOptions = useCallback(() => {
        switch (mode) {
            case EUsePageStateMode.queryString:
                const queryStringState = new Map(
                    Array.from(searchParams.entries())
                        .map((param) => [param[0], JSON.parse(param[1], reviver)])
                )
                return new Map([...defaultValue, ...queryStringState]) as TServerSideOptions
            case EUsePageStateMode.sessionStorage:
            case EUsePageStateMode.localStorage:
                const stringValue = EUsePageStateMode.sessionStorage
                    ? sessionStorage.getItem(storageKey)
                    : localStorage.getItem(storageKey)
                return stringValue
                    ? new Map([...defaultValue, ...JSON.parse(stringValue, reviver)]) as TServerSideOptions
                    : defaultValue
            case EUsePageStateMode.noStorage:
                return defaultValue
        }
    }, [])

    // синхронизация состояний storage -> serverSideOptions при моунте
    const [serverSideOptions, setServerSideOptions] = useState<TServerSideOptions>(initialSetServerSideOptions()!)

    // синхронизация состояний serverSideOptions -> storage
    useLayoutEffect(() => {
        DEBUG && console.log(DEBUG_PREFIX, 'current serverSideOptions state', serverSideOptions)
        switch (mode) {
            case EUsePageStateMode.queryString:
                setSearchParams(new URLSearchParams(
                    Array.from(serverSideOptions)
                        .map((param) => [param[0], JSON.stringify(param[1], replacer)]),
                ))
                return
            case EUsePageStateMode.sessionStorage:
                sessionStorage.setItem(storageKey, JSON.stringify(serverSideOptions, replacer))
                return
            case EUsePageStateMode.localStorage:
                localStorage.setItem(storageKey, JSON.stringify(serverSideOptions, replacer))
                return
        }
    }, [serverSideOptions])

    useEffect(() => {
        if (varsBehaviorMap) {
            setProcessedParams(varsBehaviorMap(Object.fromEntries(serverSideOptions)))
        } else {
            setProcessedParams(Object.fromEntries(serverSideOptions))
        }
    }, [serverSideOptions])

    return {
        variables: processedParams,
        serverSideOptions,
        setServerSideOptions
    }
}