with open("src/pages/AdminDashboard.tsx", "r") as f:
    content = f.read()

import re

# Add copiedId state
content = re.sub(
    r'const \[showSeminar, setShowSeminar\] = useState\(false\);',
    'const [showSeminar, setShowSeminar] = useState(false);\n  const [copiedId, setCopiedId] = useState<string | null>(null);',
    content
)

# Modify copyEmailDraft to use copiedId instead of alert
new_copy_func = """
  const copyEmailDraft = async (reg: any) => {
    const htmlString = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
  <div style="background-color: #0f1015; padding: 40px 30px; text-align: center;">
    <img src="https://blackgifttech.com/logo.png" alt="Blackgift Tech Labs" style="max-width: 150px; height: auto; margin-bottom: 15px;" />
    <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 2px;">BLACKGIFT TECH LABS</h1>
  </div>
  <div style="padding: 40px 30px; background-color: #fff; color: #333; line-height: 1.6;">
    <h2 style="color: #1a56db; font-size: 22px; margin-top: 0;">Congratulations, ${reg.name}!</h2>
    <p>Your registration for the <strong>Vibe-Code Web Design Seminar</strong> has been officially approved.</p>
    <p>We are thrilled to have you join us for this transformative experience. During the seminar, you will discover how to leverage cutting-edge AI tools to design, build, and launch incredible websites and applications—without needing any prior coding experience.</p>
    <p>Get ready to unlock your potential, elevate your skills, and take a massive leap into the world of tech!</p>
    
    <div style="background-color: #f8f9fa; border-left: 4px solid #1a56db; padding: 15px; margin: 25px 0;">
      <p style="margin: 0; font-weight: bold;">Next Steps:</p>
      <ul style="margin: 10px 0 0 0; padding-left: 20px;">
        <li>Keep an eye on this inbox for further updates.</li>
        <li>We will send you the official schedule, venue details, and access links soon.</li>
      </ul>
    </div>
    
    <p>We can't wait to see what you'll create.</p>
    <p style="margin-bottom: 0;">Best regards,<br/><strong>The Blackgift Team</strong></p>
  </div>
  <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Blackgift Tech Labs. All Rights Reserved.</p>
  </div>
</div>`;

    try {
      const htmlBlob = new Blob([htmlString], { type: 'text/html' });
      const textBlob = new Blob([`Congratulations ${reg.name}, your registration for the Vibe-Code Seminar is approved. View this email in an HTML-supported client.`], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
      await navigator.clipboard.write(data);
      setCopiedId(reg.id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = htmlString;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(reg.id);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };
"""

content = re.sub(
    r'const copyEmailDraft = async \(reg: any\) => \{[\s\S]*?alert\(' + r"'Email HTML copied to clipboard \(fallback\)\. Paste this as HTML code\.'" + r'\);\n\s*\}\n\s*\};',
    new_copy_func.strip(),
    content
)

# Replace "Create Draft" with `{copiedId === reg.id ? 'Copied!' : 'Create Draft'}`
content = re.sub(
    r'<button\s*className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded font-semibold transition-colors text-xs"\s*onClick=\{\(\) => copyEmailDraft\(reg\)\}\s*>\s*Create Draft\s*</button>',
    r'''<button
                                  className={`${copiedId === reg.id ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'} text-white px-3 py-1 rounded font-semibold transition-colors text-xs`}
                                  onClick={() => copyEmailDraft(reg)}
                                >
                                  {copiedId === reg.id ? 'Copied!' : 'Create Draft'}
                                </button>''',
    content
)

with open("src/pages/AdminDashboard.tsx", "w") as f:
    f.write(content)
