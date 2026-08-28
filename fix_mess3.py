with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 486 and line.strip() == ")}":
        new_lines.append(line)
        new_lines.append("                </div>\n")
        new_lines.append("              </div>\n")
        new_lines.append("              {/* END SCALING CONTAINER */}\n")
        new_lines.append("            </motion.div>\n")
        new_lines.append("          )}\n")
        continue
    if 487 <= i <= 491:
        continue
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)
