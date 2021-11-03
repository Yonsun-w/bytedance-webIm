import jwt from 'jsonwebtoken';

let token = {
    setToken: (str) => {
        const tokenKey = jwt.sign({ UUID: str }, 'ilovearco', { expiresIn: '1d' });
        return tokenKey;
    },
    getToken: (tokenKey) => {
        try {
            const key = jwt.verify(tokenKey, 'ilovearco');
            return key;
        } catch (error) {
            return error;
        }
    }
}

export { token }