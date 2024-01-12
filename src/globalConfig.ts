type TConfig = {
    apiAuthServiceAddress: string
}

export const GLOBAL_CONFIG: TConfig = {
    apiAuthServiceAddress: import.meta.env.VITE_APP_API_AUTH_SERVICE_ADDRESS || 'http://85.175.194.251:50443/api/auth-service/',
}
