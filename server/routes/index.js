const userRoutes = require('./user-routes');
const authRoutes = require('./auth-routes');
const transportsRoutes = require('./transports-routes');
const locationsRoutes = require('./locations-routes');
const dataEntriesRoutes = require('./data-entries-routes');
const statsRoutes = require('./stats-routes');

const router = {
    userRoutes,
    authRoutes,
    transportsRoutes,
    locationsRoutes,
    dataEntriesRoutes,
    statsRoutes
}

module.exports = router;