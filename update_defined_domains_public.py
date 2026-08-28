import re

with open('src/pages/DefinedDomainsPublic.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'<div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-\[9px\] flex items-center justify-center text-white font-bold text-\[10px\] tracking-wider">\s*LOGO\s*</div>',
    '<img src="/defineddomain.png" alt="Defined Domains Logo" className="w-10 h-10 object-contain" />',
    content
)

with open('src/pages/DefinedDomainsPublic.tsx', 'w') as f:
    f.write(content)
