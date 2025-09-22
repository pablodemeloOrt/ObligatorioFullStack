export const fijarUserId = (req, res, next) => {
    const userId = req.user.id;
    req.body.userId = userId;
    next();
};
