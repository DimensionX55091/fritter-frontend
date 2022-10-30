import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Report} from '../report/model';

export enum Reason {
    ABUSIVE,
    SPAM,
    SENSITIVE,
}

type ReportResponse = {
    _id: string,
    reporterId: string,
    freetId: string,
    reasons: Set<Reason>,
    dateCreated: string
}

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Report object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} report - A report
 * @returns {ReportResponse} - The report object formatted for the frontend
 */
const constructReportResponse = (report: HydratedDocument<Report>): ReportResponse =>  {
    const reportCopy: Report = {
        ...report.toObject({
            versionKey: false
        })
    };
    return {
        ...reportCopy,
        _id: reportCopy._id.toString(),
        reporterId: reportCopy.reporterId.toString(),
        freetId: reportCopy.freetId.toString(),
        reasons: reportCopy.reasons,
        dateCreated: formatDate(reportCopy.dateCreated)
    };
};

export {
    constructReportResponse
};