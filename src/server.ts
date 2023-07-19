import { initDb } from "./db/connection";
import { createApp } from "./app";

const port = process.env.PORT || 3000;

async function startServer() {
    const { app, server } = await createApp();

    initDb((err: Error | null) => {
        if (err) {
            console.error(err);
        } else {
            app.listen(port);
            console.log(`Web Server is listening at http://localhost:${port}/graphql`);
        }
    });
}

startServer().catch((error) => {
    console.error("Error starting the server:", error);
});
