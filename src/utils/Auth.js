export const saveAuthData = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
}

export const deleteAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');
