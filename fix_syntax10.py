with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 486 and line.strip() == ")}":
        continue
    if i == 487 and line.strip() == ")}":
        continue
    if i == 488 and line.strip() == "</motion.div>":
        new_lines.append("            )}\n")
        new_lines.append("            </div>\n")
        new_lines.append("          </motion.div>\n")
        new_lines.append("        )}\n")
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
