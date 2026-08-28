with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 209 and line.strip() == ")}":
        continue
    if i == 211 and line.strip() == "</div>":
        continue
    if i == 212 and "{/* END SCALING CONTAINER */}" in line:
        continue
    if i == 235 and "{/* END SCALING CONTAINER */}" in line:
        continue
    if i == 237 and line.strip() == ")}":
        continue
    if i == 238 and line.strip() == "</div>":
        continue
    if i == 239 and line.strip() == "</div>":
        continue
    if i == 240 and "{/* END SCALING CONTAINER */}" in line:
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
