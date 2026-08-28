with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

content = content.replace("                    </div>\n                  </div>", "                    </div>\n                  )} \n                  </div>\n                </div>\n              {/* END SCALING CONTAINER */}")

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
