export interface AuthResponse {
    success: boolean;
    data:    User
}

export interface User {
    role:             string;
    isEmailConfirmed: boolean;
    twoFactorEnable:  boolean;
    _id:              string;
    name:             string;
    email:            string;
    createdAt:        string;
    __v:              number;
    token?:           string;
}