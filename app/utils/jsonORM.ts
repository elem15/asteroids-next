import fs from 'fs';
import { join } from 'path';
const fsPromises = fs.promises;

export async function writeJsonDB(filename: string, record: Record<any, any>) {
  try {
    await fsPromises.writeFile(join(process.cwd(), 'app', 'api', 'json', filename + '.json'), JSON.stringify(record));
  } catch (err) {
    console.error(err);
  }
}

export async function readJsonDB(filename: string) {
  try {
    const data = await fsPromises.readFile(join(process.cwd(), 'app', 'api', 'json', filename + '.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
}
