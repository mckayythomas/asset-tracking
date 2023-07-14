export const mockContext = (context: any) => {
        context = { ...context };
        context.isAuthenticated = () => true;
        return context;
};