import fs from 'fs';
import path from 'path';

function checkBrackets(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let open = 0;
    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let char of line) {
            if (char === '{') open++;
            if (char === '}') open--;
        }
        if (open < 0) {
            console.log(`Extra closing bracket in ${filePath} at line ${i + 1}`);
            return false;
        }
    }
    if (open !== 0) {
        console.log(`Missing ${open > 0 ? 'closing' : 'opening'} bracket in ${filePath}`);
        return false;
    }
    return true;
}

const srcDir = 'c:/Users/usr/Desktop/fjcm1/client/src';
function walk(dir) {
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.css')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            let open = 0;
            let lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                for (let char of line) {
                    if (char === '{') open++;
                    if (char === '}') open--;
                    if (open < 0) {
                        console.log(`EXTRA_BRACKET: ${fullPath} at line ${i + 1}`);
                        open = 0; // reset to keep going? No, stop.
                        return;
                    }
                }
            }
            if (open !== 0) {
                console.log(`MISSING_BRACKET: ${fullPath} has ${open} open brackets`);
            }
        }
    }
}

walk(srcDir);
console.log('Done checking brackets.');
