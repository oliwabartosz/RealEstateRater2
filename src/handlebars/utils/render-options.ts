import { RequestWithUser } from '../../interfaces/auth';
import fs from 'fs';

export function getDomainAndPort() {
  return {
    domain: process.env.DOMAIN,
    port: process.env.PORT,
  };
}
export function getUserInfo(request: RequestWithUser) {
  return {
    username: request.user.name,
    userId: request.user.id,
    userRole: request.user.roles,
  };
}

export async function getImagesFromDirectory(directoryPath) {
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
