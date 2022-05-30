const express = require('express')
const { logger } = require('./logger')
const reports_repo = require('./reports-repo')
const path = require('path')
const { report } = require('process')

logger.debug('====== System startup ========')

const port = 8080

const app = express()

app.use(express.static(path.join('.',' /static')))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/reports', async(req, res) => {
    const reports = await reports_repo.getAllreports()
    res.status(200).json( {reports })
})

app.get('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    const reports = await reports_repo.getReportByid(report_id)
    res.status(200).json( {reports })
})

app.delete('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    try {
        const reports = await reports_repo.deleteReport(report_id)
        res.status(200).json( { num_records_deleted: reports })
    }
    catch (e) {
        logger.error(`failed to delete report. Error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})

app.put('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    try {
        report = req.body
        const result = await reports_repo.updateReport(report, report_id)
        res.status(200).json( {
            res: 'success',
            url: `/reports/${report.ID}`,
            result
             })
    } catch (e) {
        logger.error(`failed to update report. Error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})

app.post('/reports', async(req, res) => {
    try {
        report = req.body
        const result = await reports_repo.addReports(report)
        res.status(201).json( {
            res: 'success',
            url: `/reports/${result[0]}`,
            result
             })
    } catch (e) {
        logger.error(`failed to insert report. Error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})

app.listen(port, () => {
    logger.info(`Listening on port ${port}`)
    })