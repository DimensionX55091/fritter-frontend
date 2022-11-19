import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {User} from '../user/model'

type FollowResponse = {
    followerUsername: string,
    followedUsername: string
}

type UnfollowResponse = {
    followerUsername: string,
    followedUsername: string
}

const constructFollowResponse = (followerUsername: string, followedUsername: string): FollowResponse => {
    return {
        followerUsername: followerUsername,
        followedUsername: followedUsername
    }
}

const constructUnfollowResponse = (followerUsername: string, followedUsername: string): UnfollowResponse => {
    return {
        followerUsername: followerUsername,
        followedUsername: followedUsername
    }
}

export {
    constructFollowResponse,
    constructUnfollowResponse
};