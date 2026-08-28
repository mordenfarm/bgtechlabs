with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 233 and "{/* END SCALING CONTAINER */}" in line:
        continue
    if i == 234 and line.strip() == "</div>":
        continue
    if i == 235 and line.strip() == "</div>":
        continue
    if i == 236 and "{/* END SCALING CONTAINER */}" in line:
        continue
    if i == 241 and line.strip() == "</div>":
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
