'use server'

import { spawn } from 'child_process';
import path from 'path';
import { LpProblemData } from '@/types/formattedData';
import { complexResultType } from '@/types/complexResultType';

export async function calculateSimplex(data: LpProblemData[]): Promise<complexResultType[]> {

    return new Promise((resolve, reject) => {
        const pythonScriptPath = path.join(process.cwd(), 'python', 'solve_lp.py');
        const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(data)]);

        let output = '';
        let errorOutput = '';

        // Set a timeout (e.g., 30 seconds)
        const timeout = setTimeout(() => {
            pythonProcess.kill(); // Terminate the process
            reject(new Error('Python script execution timed out'));
        }, 30000);

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
            // console.log({ output });
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            clearTimeout(timeout); // Clear the timeout as the process has finished

            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                console.error(`Error output: ${errorOutput}`);
                reject(new Error(`Python script exited with code ${code}`));
                return;
            }

            try {
                const jsonMatch = output.match(/\[.*\]/);
                if (!jsonMatch) {
                    throw new Error('No JSON found in the output');
                }

                const jsonString = jsonMatch[0];

                const result = JSON.parse(jsonString);
                resolve(result);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                reject(error);
            }
        });

        // Handle potential errors
        pythonProcess.on('error', (error) => {
            clearTimeout(timeout); // Clear the timeout as an error occurred
            console.error('Failed to start Python process:', error);
            reject(error);
        });
    });
}