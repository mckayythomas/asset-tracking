export const mockContext = (context: any) => {
        context = { ...context };
        context.isAuthenticated = () => true;
        return context;
};

export const fakeArguments = (userId: string) => {
    const args = {
        userId: userId
    };
    return args;
};