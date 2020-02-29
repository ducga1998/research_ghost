var KnexMigrator = require('knex-migrator');
var knexMigrator = new KnexMigrator({
    knexMigratorFilePath: __dirname
});

// check your database health
knexMigrator.isDatabaseOK()
    .then(function () {
        console.log("database is ok");
        process.exit(0);
    })
    .catch(function (err) {
        console.log("db error: " + err.code);
        if (err.code === 'DB_NOT_INITIALISED') {
            knexMigrator.init().then(function () {
                process.exit(0);
            });
        }

        if (err.code === 'DB_NEEDS_MIGRATION') {
            knexMigrator.migrate().then(function () {
                process.exit(0);
            });
        }
    });
