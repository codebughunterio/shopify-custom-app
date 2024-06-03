import * as fs from "node:fs";


export default function useLog() {
    // Generate the filename based on the current date and replace '/' with '-'
    const filename = `./logs/${new Date().toLocaleDateString().replaceAll('/', '-')}.log`;

    return {
        // Function to write a log message to the log file
        write: message => {
            // Append the log message to the file
            fs.appendFile(
                filename,
                `[${new Date().toLocaleTimeString()}] ${JSON.stringify(message, null, 2)}\n`,
                (err) => {
                    // Throw an error if there was an error appending the log message
                    if (err) throw err;
                }
            );
        },
        // Function to read the contents of the log file
        read: () => {
            return new Promise((resolve, reject) => {
                // Read the file contents
                fs.readFile(
                    filename,
                    'utf8',
                    (err, data) => {
                        // Reject the promise with an error if there was an error reading the file
                        if (err) reject(err);
                        // Resolve the promise with the file contents
                        else resolve(data);
                    }
                );
            });
        }
    };
}

