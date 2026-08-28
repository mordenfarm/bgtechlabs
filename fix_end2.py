with open('src/pages/DefinedDomains.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 487 and line.strip() == "</div>":
        # we know it needs:
        new_lines.append("                  </div>\n")
        new_lines.append("                </div>\n")
        new_lines.append("              {/* END SCALING CONTAINER */}\n")
        new_lines.append("            </motion.div>\n")
        new_lines.append("          )}\n")
        continue
    
    if 488 <= i <= 492:
        continue # delete the remaining bad lines
    
    new_lines.append(line)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.writelines(new_lines)

