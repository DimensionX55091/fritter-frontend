import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FollowCollection from '../follow/collection';

/**
 * Check that the user is not following the already followed user
 */
const isNotFollowing = async (req: Request, res: Response, next: NextFunction) => {
    const validFollowerFormat = Types.ObjectId.isValid(req.session.userId);

    const follower = validFollowerFormat ? await UserCollection.findOneByUserId(req.session.userId) : '';
    const followed = await UserCollection.findOneByUsername(req.params.followedUsername);

    if (!follower) {
        res.status(404).json({
            error: {
                UserNotFound: `User with ID ${req.params.followerId} does not exist.`
            }
        });
        return;
    }
    if (!followed) {
        res.status(404).json({
            error: {
                UserNotFound: `User with username ${req.params.followedUsername} does not exist.`
            }
        });
        return;
    }

    if (follower.followings.includes(followed._id)) {
        res.status(400).json({
            error: {
                AlreadyFollowing: `The user is already following the user ${req.params.followedUsername}`
            }
        });
        return;
    }

    next();
};

/**
 * Check that the user is not following itself
 */
const isNotSelf = async (req: Request, res: Response, next: NextFunction) => {
    const validFollowerFormat = Types.ObjectId.isValid(req.session.userId);

    const follower = validFollowerFormat ? await UserCollection.findOneByUserId(req.session.userId) : '';
    const followed = await UserCollection.findOneByUsername(req.params.followedUsername);

    if (!follower) {
        res.status(404).json({
            error: {
                UserNotFound: `User with ID ${req.params.followerId} does not exist.`
            }
        });
        return;
    }
    if (!followed) {
        res.status(404).json({
            error: {
                UserNotFound: `User with username ${req.params.followedUsername} does not exist.`
            }
        });
        return;
    }
    if (follower._id === followed._id) {
        res.status(400).json({
            error: {
                FollowSelf: `The user cannot follow itself`
            }
        });
        return;
    }

    next();
};

/**
 * Check that a user is following the user that they try to unfollow
 */
const isFollowing = async (req: Request, res: Response, next: NextFunction) => {
    const validFollowerFormat = Types.ObjectId.isValid(req.session.userId);

    const follower = validFollowerFormat ? await UserCollection.findOneByUserId(req.session.userId) : '';
    const followed = await UserCollection.findOneByUsername(req.params.followedUsername);

    if (!follower) {
        res.status(404).json({
            error: {
                UserNotFound: `User with ID ${req.params.followerId} does not exist.`
            }
        });
        return;
    }
    if (!followed) {
        res.status(404).json({
            error: {
                UserNotFound: `User with username ${req.params.followedUsername} does not exist.`
            }
        });
        return;
    }

    if (!follower.followings.includes(followed._id)) {
        res.status(400).json({
            error: {
                NotFollowing: `The user is not following the user ${req.params.followedUsername}`
            }
        });
        return;
    }

    next();
};

export {
    isNotFollowing,
    isNotSelf,
    isFollowing
}