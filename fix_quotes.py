with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# Fix the brush script quote issue
content = content.replace("font-['Brush_Script_MT',cursive,serif]", "font-['Brush_Script_MT',_cursive,_serif]")
content = content.replace("font-['Brush_Script_MT',cursive,serif]", "font-['Brush_Script_MT',_cursive,_serif]") # in case there are two

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
