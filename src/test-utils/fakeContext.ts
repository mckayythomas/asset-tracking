export const fakeLogin = (context: any) => {
        context = { ...context };
        context.user = { id: "fakeUser" };
        context.isAuthenticated = () => true;
        return context;
};

export const fakeArguments = (userId: string) => {
    const args = {
        userId: userId
    };
    return args;
};