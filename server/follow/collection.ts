import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import UserModel from '../user/model'

class FollowCollection {
    /**
     * One user follows another user
     * 
     * @param {Types.ObjectId | string} followerId - The ID of the follower
     * @param {string} followedUsername - The username of the followed user
     * @returns {Promise<boolean>} - true if the user successfully follows the other user
     */
    static async followOne(followerId: Types.ObjectId | string, followedUsername: string): Promise<boolean> {
        const follower = await UserModel.findOne({_id: followerId});
        const followed = await UserModel.findOne({username: followedUsername});
        if (!follower || !followed) {
            return false;
        } else {
            follower.followings.push(followed._id);
            followed.followers.push(followerId);
            await follower.save();
            await followed.save();
            return true;
        }
    };

    /**
     * One user unfollows another user
     * 
     * @param {Types.ObjectId | string} followerId - The ID of the follower
     * @param {string} followedUsername - The username of the followed user
     * @returns {Promise<boolean>} - true if the user successfully unfollows the other user
     */
    static async unfollowOne(followerId: Types.ObjectId | string, followedUsername: string): Promise<boolean> {
        const follower = await UserModel.findOne({_id: followerId});
        const followed = await UserModel.findOne({username: followedUsername});
        if (!follower || !followed) {
            return false;
        } else {
            if (!follower.followings.includes(followed._id)) {
                return false;
            } else {
                follower.followings = follower.followings.filter((id: Types.ObjectId | string) => (id.toString() !== followed._id.toString()));
                followed.followers = followed.followers.filter((id: Types.ObjectId | string) => (id.toString() !== followerId.toString()));
                await follower.save();
                await followed.save();
                return true;
            }
        }
    };
};

export default FollowCollection;