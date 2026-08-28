with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 395 <= i <= 397:
        continue # skip the premature closing of the scaling container
    if i == 487 and "</div>" in line:
        continue # remove an extra div closing
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
