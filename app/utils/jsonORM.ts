import fs from 'fs';
const fsPromises = fs.promises;

export async function writeJsonDB(filename: string, record: Record<any, any>) {
  try {
    await fsPromises.writeFile('/tmp/' + filename + '.json', JSON.stringify(record));
  } catch (err) {
    console.error(err);
  }
}

export async function readJsonDB(filename: string) {
  try {
    const data = await fsPromises.readFile('/tmp/' + filename + '.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return;
  }
}
