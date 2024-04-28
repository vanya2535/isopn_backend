module.exports.jsonInterceptor = (req, res, next) => {
    const originalJson = res.json;

    res.json = data => {
        originalJson.call(res, { ...data, ...(req.user || {}) });
    };

    next();
};
