with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 313 and line.strip() == "</div>":
        new_lines.append(line)
        new_lines.append("                       </div> {/* CLOSE HEADER */}\n")
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
