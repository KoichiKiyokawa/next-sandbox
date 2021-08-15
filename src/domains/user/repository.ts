export type User = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
};

const dummyUsers: User[] = Array.from(Array(10).keys()).map((i) => ({
  id: i,
  name: `user${i}`,
  email: `user${i}@example.com`,
  birthday: new Date(2000 - i, 1 - 1, 1),
}));

export const UserRepository = {
  async find(id: number): Promise<User | null> {
    return dummyUsers.find((u) => u.id === id) ?? null;
  },
  async all(): Promise<User[]> {
    return dummyUsers;
  },
};
