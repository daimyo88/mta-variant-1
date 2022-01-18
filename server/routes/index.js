const userRoutes = require('./user-routes');
const authRoutes = require('./auth-routes');
const shipsRoutes = require('./ships-routes');
const locationsRoutes = require('./locations-routes');
const dataEntriesRoutes = require('./data-entries-routes');
const statsRoutes = require('./stats-routes');

const router = {
    userRoutes,
    authRoutes,
    shipsRoutes,
    locationsRoutes,
    dataEntriesRoutes,
    statsRoutes
}

module.exports = router;