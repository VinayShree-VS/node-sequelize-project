const jwt = require("jsonwebtoken");

function generateToken(user) {
    const jti = `${user.id}-${Date.now()}`;
    const payload = { userId: user.id,email: user.email,roles:user.roles,jti};
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY , {
        expiresIn: '1h',
    });
    return token;
};

module.exports = {generateToken}