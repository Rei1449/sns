export interface ReqUserInfo {
    id: number,
    email: string,
    iat: number,
    exp: number
}

export interface JwtPayload {
    user: ReqUserInfo
}
