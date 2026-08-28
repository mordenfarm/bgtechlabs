import re

with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

# ExamSidemann Replacement
content = re.sub(
    r'<GraduationCap.*?/>',
    r'<img src="https://i.ibb.co/6RdXZMmW/es-logo.png" alt="ExamSidemann Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />',
    content,
    count=1
)

# Saviour Replacement
content = re.sub(
    r'<ShieldCheck.*?/>',
    r'<img src="/saviourai.png" alt="Saviour Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-2xl shadow-sm" />',
    content,
    count=1
)

# Vibe Code Replacement -> Let's change this to E-Razor
content = re.sub(
    r'<Code2.*?/>',
    r'<img src="/e-razor.png" alt="E-Razor Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-xl" />',
    content,
    count=1
)
content = content.replace('Vibe Code</h3>', 'E-Razor</h3>')
content = content.replace('{/* Card 3: Vibe Code */}', '{/* Card 3: E-Razor */}')

# Zimsec Hub Replacement -> Let's change this to Code Droid
content = re.sub(
    r'<BookOpen.*?/>',
    r'<img src="/code-droid.png" alt="Code Droid Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-xl shadow-sm" />',
    content,
    count=1
)
content = content.replace('Zimsec Hub</h3>', 'Code Droid</h3>')
content = content.replace('{/* Card 4: Zimsec Hub */}', '{/* Card 4: Code Droid */}')

with open("src/pages/Home.tsx", "w") as f:
    f.write(content)
