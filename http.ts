import { main } from '@src/main';

main().then((app) => {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    app.listen(port, () => {
        console.log(`🚀 Server running on ${protocol}://${host}:${port}`);
        console.log(`✅ API Documentation available at ${protocol}://${host}:${port}/docs`);
    });
});
