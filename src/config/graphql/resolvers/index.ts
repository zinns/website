import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user';

const resolvers = mergeResolvers([userResolvers]);

export default resolvers;
