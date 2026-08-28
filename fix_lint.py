with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

# Make sure imports are clean
import re
content = re.sub(
    r'import { ChevronRight, ChevronLeft, Smartphone, Code, MonitorPlay, Film, PenTool, BrainCircuit, GraduationCap, ShieldCheck, Code2, BookOpen, ArrowRight } from .lucide-react.;',
    r'import { ChevronRight, ChevronLeft, Smartphone, Code, MonitorPlay, Film, PenTool, BrainCircuit, ArrowRight } from \'lucide-react\';',
    content
)

with open("src/pages/Home.tsx", "w") as f:
    f.write(content)
