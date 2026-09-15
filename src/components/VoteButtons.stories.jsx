import VoteButtons from './VoteButtons';

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'upvoted' },
    onDownVote: { action: 'downvoted' },
  },
};

export const Neutral = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: ['user-3', 'user-4'],
    authUserId: 'user-99',
  },
};

export const Upvoted = {
  args: {
    upVotesBy: ['user-1', 'user-2', 'user-99'],
    downVotesBy: ['user-3'],
    authUserId: 'user-99',
  },
};

export const Downvoted = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: ['user-2', 'user-3', 'user-99'],
    authUserId: 'user-99',
  },
};

export const HighScore = {
  args: {
    upVotesBy: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    downVotesBy: [],
    authUserId: null,
  },
};
