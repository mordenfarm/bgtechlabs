import re

with open('src/pages/DefinedDomains.tsx', 'r') as f:
    content = f.read()

content = re.sub(
r'''                           </div>
                        </div>
                      </div>

                    </div>
                  \)\}
                    </div>
                  </div>
                \{/\* END SCALING CONTAINER \*/\}
              </motion.div>''',
r'''                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* END SCALING CONTAINER */}
            </motion.div>''', content)

with open('src/pages/DefinedDomains.tsx', 'w') as f:
    f.write(content)
