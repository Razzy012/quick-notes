import { writable, get } from 'svelte/store';
import { signupFETCH, loginFETCH, logoutFETCH, newAccessTokenFETCH, newRefreshTokenFETCH, logoutAllFETCH } from '$lib/utils/server';

interface User {
    logged: boolean,
    userId?: string,
    userName?: string,
    accessToken?: string,
    refreshToken?: string
};

export const authUser = writable<User>({
    logged: false
});

export const signup = async (username: string, password: string) => {
    try {
        const result = await signupFETCH(username, password);
        authUser.set({
            logged: true,
            userId: result.id,
            userName: username,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (error) {
        throw error;
    }
}

export const login = async (username: string, password: string) => {
    try {
        const result = await loginFETCH(username, password);
        authUser.set({
            logged: true,
            userId: result.id,
            userName: username,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (error) {
        throw error;
    }
}

export const newTokens = async () => {
    try {
        await newAccessToken();
    } catch (error) {
        if (error.status === 401) {

            try {
                await newRefreshToken();
            } catch (error) {
                throw error;
            }

        } else {
            throw error;
        }
    }
}

export const logout = async () => {
    try {
        const result = await logoutFETCH(get(authUser).refreshToken || '');
        authUser.set({
            logged: false,
        });
    } catch (error) {
        throw error;
    }
}

export const logoutAll = async () => {
    try {
        const result = await logoutAllFETCH(get(authUser).refreshToken || '');
        authUser.set({
            logged: false,
        });
    } catch (error) {
        throw error;
    }
}

export const withAuthorizationRefresher = async (fn: () => any) => {
    try{
        return fn();
    } catch (error) {
        if (error.status === 401) {

            try {
                await newTokens();
                return fn();
            } catch (error) {
                throw error;
            } 

        } else {
            throw error;
        } 
    }
};

const newAccessToken = async () => {
    try {
        const result = await newAccessTokenFETCH(get(authUser).refreshToken || '');
        authUser.set({
            ...get(authUser),
            accessToken: result.accessToken,
        });
    } catch (error) {
        throw error;
    }
}

const newRefreshToken = async () => {
    try {
        const result = await newRefreshTokenFETCH(get(authUser).refreshToken || '');
        authUser.set({
            ...get(authUser),
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (error) {
        throw error;
    }
}
