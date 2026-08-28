with open("src/pages/AdminDashboard.tsx", "r") as f:
    content = f.read()

import re

# We will replace the <div style="background-color: #0f1015; padding: 30px; text-align: center;">...</div>
# with one that has the logo

new_header = """
  <div style="background-color: #0f1015; padding: 40px 30px; text-align: center;">
    <img src="https://blackgifttech.com/logo.png" alt="Blackgift Tech Labs" style="max-width: 150px; height: auto; margin-bottom: 15px;" />
    <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 2px;">BLACKGIFT TECH LABS</h1>
  </div>
"""

content = re.sub(
    r'<div style="background-color: #0f1015; padding: 30px; text-align: center;">\s*<h1 style="color: #fff; margin: 0; font-size: 24px; letter-spacing: 2px;">BLACKGIFT TECH LABS</h1>\s*</div>',
    new_header.strip(),
    content
)

with open("src/pages/AdminDashboard.tsx", "w") as f:
    f.write(content)
