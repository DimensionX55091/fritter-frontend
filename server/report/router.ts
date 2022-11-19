import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from './collection';
import ReportCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as reportValidator from '../report/middleware'
import * as util from './util';

const router = express.Router();

/**
 * Create a new report
 * 
 * @name POST /api/reports/
 * 
 * @param {string} reporterId - The ID of the reporter
 * @param {string} freetID - The ID of the reported freet
 * @param {Set<Reason>} reasons - The set of reasons the freet is reported
 * @return {ReportResponse} - The created report
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn
    ],
    async (req: Request, res: Response) => {
        const reporterId = req.session.userId;
        const freetId = req.body.freetId;
        const reasons = req.body.reasons;
        const report = await ReportCollection.addOne(reporterId, freetId, reasons);
        res.status(201).json({
            message: `Your have successfully report the freet with ID ${report._id}`,
            report: util.constructReportResponse(report)
        });
    }
);

/**
 * Delete a report
 * 
 * @name DELETE /api/reports/:reportId?
 * 
 * @param {string} reportId - The ID of the report that is to be deleted
 * @return {string} - A success message
 */
router.delete(
    '/:reportId?',
    [
        userValidator.isUserLoggedIn,
        reportValidator.isReportExists
    ],
    async (req: Request, res: Response) => {
        const report = ReportCollection.findOneByReportId(req.params.reportId);
        await ReportCollection.deleteOne(req.params.reportId);
        res.status(200).json({
            message: `The report with ID ${req.params.reportId} has been deleted`
        });
    }
)

export {router as reportRouter}