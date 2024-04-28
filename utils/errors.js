module.exports.mapErrors = errors => ({
    errors: errors.errors.map(({ path, msg }) => ({ path, msg })),
});
