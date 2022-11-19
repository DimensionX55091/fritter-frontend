import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ReportCollection from '../report/collection';

/**
 * Checks if a report with reportId is req.params exists
 */
const isReportExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.reportId);
    const report = validFormat ? await ReportCollection.findOneByReportId(req.params.reportId) : '';
    if (!report) {
        res.status(404).json({
            error: {
                reportNotFound: `Report with report ID ${req.params.reportId} does not exist.`
            }
        });
        return;
    }
    
    next();
};

export {
    isReportExists
};