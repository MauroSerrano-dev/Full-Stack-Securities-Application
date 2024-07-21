import 'reflect-metadata';
import { AppDataSource } from './utils/database';
import { seedDatabase } from './utils/populate';
import app from './app';

AppDataSource.initialize().then(async () => {
    await seedDatabase(AppDataSource);
    console.log('Database seeding completed.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log('Error during Data Source initialization:', error));