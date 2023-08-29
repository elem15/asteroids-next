import fs from 'fs';
import { join } from 'path';
const fsPromises = fs.promises;

export async function writeJsonDB(filename: string, record: Record<any, any>) {
  try {
    console.log(join('tmp', filename + '.json'));
    await fsPromises.writeFile(join('tmp', filename + '.json'), JSON.stringify(record));
  } catch (err) {
    console.error(err);
  }
}

export async function readJsonDB(filename: string) {
  try {
    const data = await fsPromises.readFile(join('tmp', filename + '.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
}
