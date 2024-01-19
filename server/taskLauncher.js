const { spawn } = require('child_process');

async function executeScrapingTask(task, db) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('py', [`scripts/${task.taskDetails.siteScript}`, task.taskDetails.string]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.log(`Err code: ${code}`);
        reject(new Error('Py script failed'));
      } else {
        console.log('Task done with id ', task._id);
        try {
          const parsedResult = JSON.parse(result);
          const resultsCollection = db.collection('results');
          const insertedResult = await resultsCollection.insertOne({ tid: task._id, output: parsedResult });
          resolve(insertedResult);
        } catch (dbError) {
          reject(dbError);
        }
      }
    });
  });
}

module.exports = executeScrapingTask;
