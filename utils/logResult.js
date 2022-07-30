import { appendFile, lstat, writeFile } from 'fs/promises';

export const logResult = async (result) => {
  const stat = await lstat('log.txt');

  if (stat) {
    // Write data in 'log.txt'
    if (stat.size < 1) {
      await writeFile('log.txt', result, err => {
        // In case of a error throw err.
        if (err) throw err;
      });
    } else {
      await appendFile('log.txt', `\n\n${result}`, err => {
        // In case of a error throw err.
        if (err) throw err;
      });
    }
  }
};