import mongoose from 'mongoose';
import { Asset } from '../src/models/asset'; // Import the asset model
import { Building } from '../src/models/building'; // Import the building model
import { Department } from '../src/models/department'; // Import the department model
import { Location } from '../src/models/location'; // Import the location model
import { User } from '../src/models/user'; // Import the user model
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import path from 'path';

declare global {
  namespace NodeJS {
    interface Global {
      mongoServer: MongoMemoryServer;
    }
  }
}


// the path to the test_data directory
const testDataDirectory = path.resolve(__dirname, './test_data');
// Get all the files in the directory
const files = fs.readdirSync(testDataDirectory);

// Connect to the MongoMemory test instance
beforeAll(async () => {
    // Set up in-memory MongoDB instance
    (global as any).mongoServer = new MongoMemoryServer();
    await (global as any).mongoServer.start();
    const mongoUri = await (global as any).mongoServer.getUri();
    await mongoose.connect(mongoUri, {});

    let Model: mongoose.Model<any>;

    // Register the Asset model with Mongoose
    mongoose.model('Asset', Asset.schema);
    mongoose.model('Building', Building.schema);
    mongoose.model('Department', Department.schema);
    mongoose.model('Location', Location.schema);
    mongoose.model('User', User.schema);

    // Loop through each file
    for (const file of files) {
        // Check if the file is a .json file
        if (path.extname(file) === '.json') {
            // Create the full file path
            const filePath = path.resolve(testDataDirectory, file);

            // Read the file
            const dataBuffer = fs.readFileSync(filePath);
            const dataJson = dataBuffer.toString();
            const data = JSON.parse(dataJson);

            // Extract the prefix from the file name
            const prefix = path.parse(file).name;

            switch (prefix) {
                case 'asset':
                    Model = mongoose.model('Asset');
                    break;
                case 'building':
                    Model = mongoose.model('Building');
                    break;
                case 'department':
                    Model = mongoose.model('Department');
                    break;
                case 'location':
                    Model = mongoose.model('Location');
                    break;
                case 'user':
                    Model = mongoose.model('User');
                    break;
                default:
                    throw new Error(`Unknown model prefix: ${prefix}`);
            }
                // Add the data to the test MongoDB instance
                await Model.insertMany(
                    data.map((item: any) => ({
                        ...item,
                        _id: item._id['$oid'],
                    }))
                );

                // Log the filename to the console
                console.log(`Loaded asset file: ${file}`);
        }
    }
});

afterAll(async () => {
    // Close in-memory MongoDB instance
    await mongoose.disconnect();
    await (global as any).mongoServer.stop();
});
