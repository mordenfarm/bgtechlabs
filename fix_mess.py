import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

# Let's fix lines 211 to 237 by just replacing that whole chunk
content = re.sub(
r'''                  </div>
              \{/\* END SCALING CONTAINER \*/\}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade / Class</label>''',
r'''                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade / Class</label>''', content)

content = re.sub(
r'''                      \}\)
                </div>
              </div>
              \{/\* END SCALING CONTAINER \*/\}
                    </div>
                </div>
              \{/\* END SCALING CONTAINER \*/\}
                  <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3 rounded-\[9px\] shadow-sm transition-colors mt-2">''',
r'''                      )}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3 rounded-[9px] shadow-sm transition-colors mt-2">''', content)


with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
