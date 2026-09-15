import LeaderboardItem from './LeaderboardItem';

export default {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
};

export const Rank1Gold = {
  args: {
    rank: 1,
    user: {
      id: 'user-1',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas+Saputra&background=random',
    },
    score: 150,
  },
};

export const Rank2Silver = {
  args: {
    rank: 2,
    user: {
      id: 'user-2',
      name: 'Alif Pratama',
      email: 'alif@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alif+Pratama&background=random',
    },
    score: 110,
  },
};

export const Rank3Bronze = {
  args: {
    rank: 3,
    user: {
      id: 'user-3',
      name: 'Siti Rahma',
      email: 'siti@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Siti+Rahma&background=random',
    },
    score: 85,
  },
};

export const RegularRank = {
  args: {
    rank: 10,
    user: {
      id: 'user-10',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random',
    },
    score: 25,
  },
};
