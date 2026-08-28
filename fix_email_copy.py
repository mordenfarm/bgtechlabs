import re

with open("src/pages/AdminDashboard.tsx", "r") as f:
    content = f.read()

new_copy_func = """
  const copyEmailDraft = async (reg: any) => {
    const htmlString = `
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f9fc; padding: 40px 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
        <tr>
          <td align="center" style="padding: 40px 0; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
            <img src="https://blackgifttech.com/logo.png" alt="Blackgift Tech Labs" width="120" style="display: block; margin-bottom: 10px;" />
            <h1 style="margin: 0; font-size: 16px; font-weight: 600; color: #5f6368; letter-spacing: 1.5px; text-transform: uppercase;">Blackgift Tech Labs</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 48px;">
            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 400; color: #202124;">You're in, ${reg.name}.</h2>
            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              Your registration for the <strong>Vibe-Code Web Design Seminar</strong> has been successfully approved. We are thrilled to welcome you to this transformative experience.
            </p>
            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              During the seminar, you will discover how to leverage cutting-edge AI tools to design, build, and launch incredible websites and applications—all without needing any prior coding experience.
            </p>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #e8f0fe; border-radius: 8px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 24px;">
                  <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 500; color: #1967d2;">What happens next?</h3>
                  <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.5; color: #1a73e8;">&bull; Keep an eye on this inbox for further updates.</p>
                  <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #1a73e8;">&bull; We will send you the official schedule, venue details, and access links soon.</p>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3c4043;">
              Get ready to unlock your potential, elevate your skills, and take a massive leap into the world of tech. We can't wait to see what you'll create.
            </p>
            
            <p style="margin: 0; font-size: 16px; color: #3c4043;">
              Best regards,<br>
              <strong>The Blackgift Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 24px 48px; background-color: #f8f9fa; border-top: 1px solid #eeeeee;">
            <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #70757a;">
              &copy; ${new Date().getFullYear()} Blackgift Tech Labs. All Rights Reserved.<br>
              You are receiving this email because you registered for a Blackgift Tech Labs event.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

    try {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlString], { type: 'text/html' }),
        'text/plain': new Blob([htmlString], { type: 'text/plain' })
      });
      await navigator.clipboard.write([clipboardItem]);
      setCopiedId(reg.id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      console.error('Failed to copy rich text', err);
      navigator.clipboard.writeText(htmlString).then(() => {
        setCopiedId(reg.id);
        setTimeout(() => setCopiedId(null), 3000);
      });
    }
  };
"""

content = re.sub(
    r'const copyEmailDraft = async \(reg: any\) => \{[\s\S]*?document\.body\.removeChild\(container\);\n\s*\};',
    new_copy_func.strip(),
    content
)

with open("src/pages/AdminDashboard.tsx", "w") as f:
    f.write(content)
