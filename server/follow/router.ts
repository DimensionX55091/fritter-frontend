import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import UserCollection from '../user/collection';
import FollowCollection from '../follow/collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as followValidator from '../follow/middleware'
import * as util from './util';

const router = express.Router();

/**
 * A user follows another user
 * 
 * @name PUT /api/follows/follow/:followedUsername?
 * 
 * @param {string} followerId - The ID of the follower
 * @param {string} followedUsername - The username of the user that the follower tries to follow
 * @return {FollowResponse} - The information about the follow
 */
router.put(
    '/follow/:followedUsername?',
    [
        userValidator.isUserLoggedIn,
        followValidator.isNotFollowing,
        followValidator.isNotSelf
    ],
    async (req: Request, res: Response) => {
        const followerId = req.session.userId;
        const followedUsername = req.body.followedUsername;
        await FollowCollection.followOne(followerId, followedUsername);
        const follower = await UserCollection.findOneByUserId(followerId);
        res.status(201).json({
            message: `Your have successfully followed ${followedUsername}`,
            follow: util.constructFollowResponse(follower.username, followedUsername)
        });
    }
);

/**
 * A user unfollows another user
 * 
 * @name PUT /api/follows/unfollow/:followedId?
 * 
 * @param {string} followerId - The ID of the follower
 * @param {string} followedUsername - The username of the user that the follower tries to unfollow
 * @return {UnfollowResponse} - The information about the unfollow
 */
router.put(
    '/unfollow/:followedUsername?',
    [
        userValidator.isUserLoggedIn,
        followValidator.isFollowing
    ],
    async (req: Request, res: Response) => {
        const followerId = req.session.userId;
        const followedUsername = req.body.followedUsername;
        await FollowCollection.unfollowOne(followerId, followedUsername);
        const follower = await UserCollection.findOneByUserId(followerId);
        res.status(201).json({
            message: `Your have successfully unfollowed ${followedUsername}`,
            follow: util.constructUnfollowResponse(follower.username, followedUsername)
        });
    }
);

export {router as followRouter};