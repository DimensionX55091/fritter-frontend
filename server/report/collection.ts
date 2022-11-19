import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model'
import type {Freet} from '../freet/model'
import type {Report} from './model';
import ReportModel from './model';
import WarningCollection from '../warning/collection';
import type {Reason} from './util'
import FreetCollection from '../freet/collection';

class ReportCollection {
    /**
     * Add a new report
     * 
     * @param {Types.ObjectId | string} reporterId - The ID of the reporter
     * @param {Types.ObjectId | string} freetId - The reported freet
     * @param {Set<Reason>} reasons - The set of reasons that the freet is reported
     * @returns {Promise<HydratedDocument<Report>>} - The newly created report
     */
    static async addOne(reporterId: Types.ObjectId | string, freetId: Types.ObjectId | string, reasons: Set<Reason>): Promise<HydratedDocument<Report>> {
        const dateCreated = new Date();

        const report = new ReportModel({reporterId, freetId, reasons, dateCreated});
        await report.save();
        const freet = await FreetCollection.findOne(freetId);
        freet.numReport = freet.numReport + 1;
        await freet.save()
        await WarningCollection.updateOne(freetId);
        return report;
    };

    /**
     * Find a report by its ID
     * 
     * @param {Types.ObjectId | string} reportId - The ID of the report
     * @returns {Promise<HydratedDocument<Report>>} - The report with the given ID
     */
    static async findOneByReportId(reportId: Types.ObjectId | string): Promise<HydratedDocument<Report>> {
        return ReportModel.findOne({_id: reportId});
    };

    /**
     * Find a report by its reporter's ID and the freet
     * 
     * @param {Types.ObjectId | string} reporterId - The ID of the reporter
     * @param {Types.ObjectId | string} freetId - The reported freet
     * @returns {Promise<HydratedDocument<Report>>} - The report reported on freet by the user with ID reporterId 
     */
    static async findOneByReporterIdAndFreet(reporterId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Report>> {
        return ReportModel.findOne({reporterId: reporterId, freetId: freetId});
    };

    /**
     * Delete a report from collection
     * 
     * @param {Types.ObjectId | string} reportId - The ID of the report
     * @returns {Promise<boolean>} - true if the report has been deleted, false otherwise
     */
    static async deleteOne(reportId: Types.ObjectId | string): Promise<boolean> {
        // const report = await ReportModel.deleteOne({_id: reportId});
        const report = await ReportModel.findById(reportId);
        if (!report) {
            return false;
        } else {
            const deleteResult = await ReportModel.deleteOne({_id: reportId});
            if (!deleteResult) {
                return false;
            } else {
                const freetId = report.freetId;
                const freet = await FreetCollection.findOne(freetId);
                freet.numReport = freet.numReport - 1;
                await freet.save()
                await WarningCollection.updateOne(freetId);
                return true;
            } 
        }
    };
};

export default ReportCollection;