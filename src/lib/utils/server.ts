const domain = '83.229.87.153:3000';

export const signupFETCH = async (username: string, password: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        username: username,
        password: password
    };

    const response = await fetch(`http://${domain}/api/auth/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }

    return await response.json();
};

export const loginFETCH = async (username: string, password: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        username: username,
        password: password
    };

    const response = await fetch(`http://${domain}/api/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const newRefreshTokenFETCH = async (refreshToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        refreshToken: refreshToken
    };

    const response = await fetch(`http://${domain}/api/auth/refreshToken`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const newAccessTokenFETCH = async (refreshToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        refreshToken: refreshToken
    };

    const response = await fetch(`http://${domain}/api/auth/accessToken`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const logoutFETCH = async (refreshToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        refreshToken: refreshToken
    };

    const response = await fetch(`http://${domain}/api/auth/logout`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const logoutAllFETCH = async (refreshToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = {
        refreshToken: refreshToken
    };

    const response = await fetch(`http://${domain}/api/auth/logoutAll`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const addNoteFETCH = async (title: string, note: string, accessToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
    };

    const body = {
        title: title,
        note: note
    };

    const response = await fetch(`http://${domain}/api/note/addNote`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const updateNoteFETCH = async (id: string, title: string, note: string, accessToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
    };

    const body = {
        id: id,
        title: title,
        note: note
    };

    const response = await fetch(`http://${domain}/api/note/updateNote`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const deleteNoteFETCH = async (id: string, accessToken: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${accessToken}`
    };

    const body = {
        id: id
    };

    const response = await fetch(`http://${domain}/api/note/deleteNote`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};

export const getAllNotesFETCH = async (accessToken: string) => {
    const headers = {
        'Authorization' : `Bearer ${accessToken}`
    };

    const response = await fetch(`http://${domain}/api/note/getAllNotes`, {
        method: 'GET',
        headers: headers,
    });

    if(!response.ok){
        const responseObject = await response.json();
        throw {status: response.status, message: responseObject.error};
    }
    
    return await response.json();
};
