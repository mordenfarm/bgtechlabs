import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# Let's fix the ending divs properly
# Look for the end of the id-card-back
content = content.replace("                  )}", "                  )}\n                </div>\n              </div>\n              {/* END SCALING CONTAINER */}")

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)

