// middleware / authMiddleware.js
// authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    }
}

module.exports = {
    isAuthenticated,
};

