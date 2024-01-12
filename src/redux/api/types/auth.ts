export type TSignInResponse = {
    accessToken: string,
    accessTokenTTL: Date,
    refreshToken: string,
    refreshTokenTTL: Date
}

export type TRefreshResponse = TSignInResponse

export type TRefreshPayload = {
    refreshToken: string
}

export type TSignInPayload = {
    email: string,
    password: string
}

export type TSignUpPayload = TSignInPayload

export type TMeResponse = {
    id: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}
