import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if "{/* MRZ Zone (Machine Readable Zone) */}" in line:
        continue
    if "P&lt;DDI{newlyAddedStudent.surname.replace" in line:
        continue
    if "{newlyAddedStudent.id.toUpperCase()}&lt;6DDI&lt;" in line:
        continue
    if 'className="h-[46px] bg-white border-t border-gray-300 flex items-center px-8 text-[#0f172a] font-mono text-sm tracking-[0.2em] uppercase shrink-0 font-bold"' in line:
        continue
    if i == 484 and "</div>" in line:
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
