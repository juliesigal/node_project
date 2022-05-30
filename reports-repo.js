const connectedKnex = require('./knex-connector')

// all orm CRUD
// orm + native-sql
// orm + sp

function getAllreports() {
    return connectedKnex('reports').select('*');
}

function getReportByid(id) {
    return connectedKnex('reports').select('*').where('id', id).first();
}

function getRaw(query) {
    // run native sql query
    return connectedKnex.raw(query);
}

function addReports(report) {
    return connectedKnex('reports').insert(report);
}

function updateReport(report, id) {
    return connectedKnex('reports').where('id', id).update(report);
}

function deleteReport(id) {
    return connectedKnex('reports').where('id', id).del();
}

module.exports = {
    getAllreports,
    getReportByid,
    getRaw,
    addReports,
    updateReport,
    deleteReport
}