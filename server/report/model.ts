import {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model'
import {Reason} from './util'
import FreetCollection from 'freet/collection';
import FreetModel from '../freet/model';

export type Report = {
    _id: Types.ObjectId;
    reporterId: Types.ObjectId;
    freetId: Types.ObjectId;
    reasons: Set<Reason>;
    dateCreated: Date;
};

const ReportSchema = new Schema<Report>({
    reporterId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    freetId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Freet'
    },
    reasons: {
        type: [{ type: Schema.Types.Mixed, ref: 'Report' }],
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

const ReportModel = model<Report>('Report', ReportSchema);
export default ReportModel;