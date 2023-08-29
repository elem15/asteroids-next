import fs from 'fs';
import { join } from 'path';
const fsPromises = fs.promises;

export async function writeJsonDB(filename: string, record: Record<any, any>) {
  try {
    console.log('/tmp/' + filename + '.json');
    await fsPromises.writeFile('/tmp/' + filename + '.json', JSON.stringify(record));
  } catch (err) {
    console.error(err);
  }
}

export async function readJsonDB(filename: string) {
  try {
    console.log('/tmp/' + filename + '.json');
    const data = await fsPromises.readFile('/tmp/' + filename + '.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
}
