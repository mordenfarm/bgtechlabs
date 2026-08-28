import re
with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'                    </div>\n            \)}\n            </div>\n          </motion.div>\n        \)}\n              {/\* END SCALING CONTAINER \*/}', 
r'''                    </div>
                  )}
                  </div>
                </div>
              {/* END SCALING CONTAINER */}
            </motion.div>
          )}''', content)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
