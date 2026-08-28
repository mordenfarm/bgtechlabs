import fs from 'fs';

const content = fs.readFileSync('backup.tsx', 'utf8');
const lines = content.split('\n');

let stack = [];
for (let i = 246; i < lines.length; i++) {
    const line = lines[i];
    
    // remove self-closing divs from the count manually by replacing them
    let tempLine = line.replace(/<div[^>]*\/>/g, '');
    
    let opens = (tempLine.match(/<(div|motion\.div)[^>]*>/g) || []);
    let closes = (tempLine.match(/<\/(div|motion\.div)>/g) || []);
    
    for (let open of opens) {
        stack.push(`Line ${i+1}`);
    }
    for (let close of closes) {
        if (stack.length > 0) {
            stack.pop();
        } else {
            console.log(`EXTRA CLOSE AT LINE ${i+1}: ${line.trim()}`);
        }
    }
    
    if (stack.length === 0 && opens.length === 0 && closes.length > 0) {
        console.log(`ZERO BALANCE REACHED AT ${i+1}`);
        break;
    }
}
console.log("UNCLOSED DIVS:", stack);
