with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

content = content.replace("replace(/\\s/g, '<')", "replace(/\\\\s/g, '<')")

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
