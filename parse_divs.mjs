import fs from 'fs';

const content = fs.readFileSync('src/pages/DefinedDomains.tsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 247; i < lines.length; i++) {
    const line = lines[i];
    let opens = (line.match(/<div/g) || []).length;
    let closes = (line.match(/<\/div>/g) || []).length;
    
    let selfClose = (line.match(/<div[^>]*\/>/g) || []).length;
    opens -= selfClose;
    
    opens += (line.match(/<motion\.div/g) || []).length;
    closes += (line.match(/<\/motion\.div>/g) || []).length;
    
    let oldBalance = balance;
    balance += (opens - closes);
    console.log(`Line ${i+1}: ${line.trim()} | O:${opens} C:${closes} | B:${oldBalance}->${balance}`);
    if (balance === 0 && oldBalance > 0) {
        console.log(`ZERO BALANCE REACHED AT ${i+1}`);
        break;
    }
}
