import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function writeJsonDB(filename: string, record: Record<any, any>) {
  try {
    await fsPromises.writeFile(join(__dirname, '..', filename + '.json'), JSON.stringify(record));
  } catch (err) {
    console.error(err);
  }
}

export async function readJsonDB(filename: string) {
  try {
    const data = await fsPromises.readFile(join(__dirname, '..', filename + '.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
}
