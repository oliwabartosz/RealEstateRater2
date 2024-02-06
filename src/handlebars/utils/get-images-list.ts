const fs = require('fs');

export async function getFilesFromDirectory(directoryPath) {
    console.log(directoryPath)
    if (!fs.existsSync(directoryPath)) {
        return null; // Directory doesn't exist
    }

    try {
        const files = fs.readdirSync(directoryPath);
        return files;
    } catch (error) {
        console.error('Error reading directory:', error);
        return null;
    }
}
