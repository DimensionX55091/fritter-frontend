import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from '../freet/model';
import FreetModel from '../freet/model';
import UserCollection from '../user/collection';

class WarningCollection {
    /**
     * Update the state of the warning sign of a freet
     * 
     * @param {Types.ObjectId | string} freetId - The ID of the freet
     * @returns {Promise<boolean>} true if it is updated succesfully
     */
    static async updateOne(freetId: Types.ObjectId | string): Promise<boolean> {
        const freet = await FreetModel.findById({_id: freetId});
        if (!freet) {
            return false;
        } else {
            freet.warning = (freet.numReport > freet.warningThreshold);
            await freet.save();
            return true;
        }
    }
}

export default WarningCollection;