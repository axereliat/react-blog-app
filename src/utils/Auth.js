export const saveAuthData = (token, userId, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
}

export const deleteAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
}

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');
export const getUserId = () => localStorage.getItem('userId');
