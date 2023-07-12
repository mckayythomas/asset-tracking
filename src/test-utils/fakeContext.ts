export const fakeLogin = (isAuthenticated: boolean): any => {
    return {
        req: {
            isAuthenticated: () => isAuthenticated,
            user: isAuthenticated ? {
                googleId: "123456789",
                displayName: "Greg Greg",
                firstName: "Greg",
                lastName: "Greg",
                picture: "thispicrocks.jpg"
            } : null,
        },
    };
};