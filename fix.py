with open("src/pages/AdminDashboard.tsx", "r") as f:
    content = f.read()

import re

# Remove any erroneous return ( \n <>
content = content.replace("return (\n    <>", "return (")
content = content.replace("<Seo title=\"Admin Dashboard | Blackgift Tech Labs\" robots=\"noindex, nofollow\" />\n    <div className=\"flex h-screen bg-[#0f1015] text-gray-300 font-sans overflow-hidden\">",
"<>\n      <Seo title=\"Admin Dashboard | Blackgift Tech Labs\" robots=\"noindex, nofollow\" />\n      <div className=\"flex h-screen bg-[#0f1015] text-gray-300 font-sans overflow-hidden\">")

with open("src/pages/AdminDashboard.tsx", "w") as f:
    f.write(content)
