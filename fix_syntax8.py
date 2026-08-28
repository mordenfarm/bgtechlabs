with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 487 and line.strip() == "{/* END SCALING CONTAINER */}":
        new_lines.append("              </motion.div>\n")
        new_lines.append(line)
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
