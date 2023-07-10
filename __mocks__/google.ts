// __mocks__/google.ts
export const verify = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      userId: 'fakeUserId',
      email: 'fakeemail@gmail.com',
    });
  });