import { exec } from 'child_process'
import { isAndroid } from 'utils.js'
import appsTestList from 'appsTestList.json'

export default async () => {

  // check whether or not is running on androidd device

  if (!isAndroid()) {
    return appsTestList;
  }

  return new Promise ((resolve, reject) => {

    exec('pm list packages', (error, stdout, stderr) => {
  
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error)
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(error)
      }
    
      // Process the output
      const packageNames = stdout
            .split('\n') // Split the output into lines
            .filter(line => line.trim() !== '') // Remove empty lines
            .map(line => line.replace('package:', '').trim()); // Remove 'package:' prefix
    
      console.log(packageNames);

      resolve(packageNames)
    
    });
    
  })

}