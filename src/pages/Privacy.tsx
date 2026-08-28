import React from 'react';
import { Seo } from '../components/Seo';
import { motion } from 'framer-motion';

export function Privacy() {
  return (
    <>
      <Seo 
        title="Privacy Policy | Blackgift Tech Labs" 
        description="Privacy Policy for Blackgift Tech Labs apps and services." 
      />
      <div className="w-full flex-col flex bg-[#fcfbfa] pt-32 pb-20 px-6 font-sans">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-500 mb-2 text-sm uppercase tracking-wider font-semibold">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-500 mb-8 text-sm">Effective Date: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-blue max-w-none text-gray-700 space-y-8">

              {/* TABLE OF CONTENTS */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                <ol className="list-decimal pl-6 space-y-1 text-blue-700">
                  <li>Introduction</li>
                  <li>Definitions</li>
                  <li>Scope and Applicability</li>
                  <li>Consent</li>
                  <li>Information We Collect</li>
                  <li>How We Collect Information</li>
                  <li>Legal Bases for Processing (EEA/UK Users)</li>
                  <li>How We Use Your Information</li>
                  <li>AI Features and Automated Processing</li>
                  <li>Automated Decision-Making and Profiling</li>
                  <li>Cookies and Tracking Technologies</li>
                  <li>How We Share Your Information</li>
                  <li>Third-Party Service Providers and Sub-Processors</li>
                  <li>International Data Transfers</li>
                  <li>Data Security</li>
                  <li>Data Breach Notification</li>
                  <li>Data Retention</li>
                  <li>Children's Privacy</li>
                  <li>Educational Records and School Accounts</li>
                  <li>Your Privacy Rights — General</li>
                  <li>Rights of EEA/UK Users (GDPR)</li>
                  <li>Rights of California Residents (CCPA/CPRA)</li>
                  <li>Rights of Other U.S. State Residents</li>
                  <li>Rights of Zimbabwean Users (Cyber and Data Protection Act)</li>
                  <li>Rights of Users in Other African Jurisdictions</li>
                  <li>How to Exercise Your Rights</li>
                  <li>Do Not Track Signals</li>
                  <li>Advertising, Analytics, and Opt-Out Choices</li>
                  <li>Push Notifications</li>
                  <li>Marketing Communications</li>
                  <li>Social Media Features</li>
                  <li>User-Generated Content</li>
                  <li>Payment Information</li>
                  <li>Job Applicant and Employment-Related Data</li>
                  <li>Our Role: Controller vs. Processor</li>
                  <li>Third-Party Links and Services</li>
                  <li>Accessibility</li>
                  <li>Severability</li>
                  <li>Governing Law and Dispute Resolution</li>
                  <li>Changes to This Privacy Policy</li>
                  <li>Contact Us</li>
                  <li>Appendix A: App-Specific Notices</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  This Privacy Policy ("Policy") applies to all applications, websites, software development kits (SDKs), APIs, and digital services (collectively, the "Services") developed, published, distributed, or maintained by <strong>Blackgift Tech Labs</strong>, operating as part of BG Tech Labs (Pvt) Ltd ("we," "our," "us," or the "Company"). We are committed to protecting your personal information and your right to privacy, and we have prepared this Policy to explain, in as much detail as reasonably possible, what information we collect, why we collect it, how it is used and shared, how long it is kept, and what choices and rights you have regarding it.
                </p>
                <p className="mt-2">
                  We ask that you read this Policy carefully. It is intentionally detailed because our Services span multiple categories — including educational platforms, productivity tools, media and streaming apps, and utility software — each of which may involve different data practices. If any part of this Policy is unclear, please contact us using the details in Section 38 before using the affected Service.
                </p>
                <p className="mt-2">
                  By accessing or using any of our Services, you acknowledge that you have read and understood this Policy. If you do not agree with our practices, you should not access or use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>"Personal Data" / "Personal Information":</strong> Any information relating to an identified or identifiable natural person.</li>
                  <li><strong>"Processing":</strong> Any operation performed on Personal Data, including collection, storage, use, disclosure, or deletion.</li>
                  <li><strong>"Controller":</strong> The entity that determines the purposes and means of processing Personal Data.</li>
                  <li><strong>"Processor":</strong> An entity that processes Personal Data on behalf of a Controller.</li>
                  <li><strong>"Service Provider" / "Sub-Processor":</strong> A third party engaged by us to process Personal Data on our behalf for a specific purpose.</li>
                  <li><strong>"Sensitive Data":</strong> Data revealing racial or ethnic origin, health information, biometric or genetic data, precise geolocation, or data concerning children.</li>
                  <li><strong>"De-identified" or "Aggregated Data":</strong> Data that has been manipulated so that it can no longer reasonably be used to identify a particular individual.</li>
                  <li><strong>"Device Identifier":</strong> A unique string of numbers/letters assigned to a device, such as an advertising ID, IDFA, or Android ID.</li>
                  <li><strong>"Cookies":</strong> Small data files placed on your device that allow a website to recognize your browser.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Scope and Applicability</h2>
                <p>This Policy covers our entire portfolio of Services, which may include, without limitation:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Offline-first educational platforms and exam-preparation tools;</li>
                  <li>School and academy management systems (multi-role: administrators, teachers, parents, and other staff);</li>
                  <li>AI-assisted tutoring, chat, and content-generation tools;</li>
                  <li>Document, canvas, and productivity editors;</li>
                  <li>Media players and streaming applications;</li>
                  <li>Utility, mapping, and location-aware applications;</li>
                  <li>Marketing websites and landing pages for the above.</li>
                </ul>
                <p className="mt-2">
                  Some individual apps may present a supplemental, app-specific privacy notice inside the app. Where such a notice conflicts with this Policy on a specific point, the app-specific notice controls for that app only; this Policy otherwise fills any gaps. See Appendix A for a summary of known app-specific variations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Consent</h2>
                <p>
                  Where required by applicable law, we obtain your consent before collecting or processing certain categories of data (for example, precise location, camera/photo access, or marketing communications). You may withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal, by adjusting in-app permissions, device settings, or by contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.1 Information You Provide Directly</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Name, email address, and phone number;</li>
                  <li>Account credentials (username, password, or authentication tokens);</li>
                  <li>School, academy, or organization name and role (student, parent, teacher, matron, administrator);</li>
                  <li>Profile details such as a display name or avatar;</li>
                  <li>Content you submit, including messages, documents, uploaded files, comments, forum posts, and answers within educational tools;</li>
                  <li>Support requests, survey responses, and feedback you send us;</li>
                  <li>Billing name, address, and payment-related details (processed via third-party payment processors — see Section 32).</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Device identifiers, advertising IDs, IP address, operating system and version, device model, and browser type;</li>
                  <li>App version, crash logs, diagnostic and performance data;</li>
                  <li>Usage statistics such as features used, session length, screens or pages visited, click and navigation patterns;</li>
                  <li>Approximate location derived from IP address, and, where permitted, precise GPS location for features that require it (e.g., showing region-relevant radio stations or local content);</li>
                  <li>Log data such as timestamps, referring/exit pages, and error reports.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.3 Information Stored Locally / Offline</h3>
                <p>
                  Certain Services are offline-first and store content, learning progress, or preferences directly on your device using local databases or storage. This data is not transmitted to us unless a sync, backup, or cloud-save feature is explicitly enabled by you.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.4 Information from AI-Assisted Features</h3>
                <p>
                  If a Service includes an AI tutor, chatbot, or generative feature, we may process the prompts, questions, or files you submit in order to generate and return a response, and, where a save/history feature is enabled, to store that conversation history.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.5 Information from Third Parties</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Basic profile information if you sign in via a third-party identity provider (e.g., Google Sign-In);</li>
                  <li>Account setup information provided by a school, academy, or organization administrator on your behalf;</li>
                  <li>Aggregated or de-identified data from analytics or advertising partners.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.6 Sensitive Data</h3>
                <p>
                  Unless explicitly required for a specific app's core functionality and authorized by you, we do not knowingly collect Sensitive Data such as precise health information, biometric identifiers, contacts, or photos without your direct, informed permission through your device's standard permission dialogs.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">5.7 Aggregated and De-Identified Data</h3>
                <p>
                  We may create aggregated or de-identified data from the information described above. Such data is not Personal Data and may be used for any lawful business purpose, including research and product improvement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How We Collect Information</h2>
                <p>We collect information in three general ways:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Directly from you</strong> — when you create an account, fill out a form, contact support, or otherwise interact with a Service;</li>
                  <li><strong>Automatically</strong> — through cookies, SDKs, log files, and similar technologies as you use a Service;</li>
                  <li><strong>From third parties</strong> — such as identity providers, school administrators, or analytics/advertising partners, as described in Section 5.5.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Legal Bases for Processing (EEA/UK Users)</h2>
                <p>If you are located in the European Economic Area or the United Kingdom, we rely on the following legal bases to process your Personal Data:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Consent</strong> — for optional features such as marketing communications or precise location access;</li>
                  <li><strong>Performance of a contract</strong> — to provide the Services you have requested, including account creation and core app functionality;</li>
                  <li><strong>Legitimate interests</strong> — such as improving our Services, ensuring security, and preventing fraud, provided these interests are not overridden by your rights and interests;</li>
                  <li><strong>Legal obligation</strong> — where processing is required to comply with applicable law;</li>
                  <li><strong>Vital interests</strong> — in rare cases where processing is necessary to protect someone's life.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Providing Core Functionality:</strong> Operating, maintaining, personalizing, and improving Service features, including saving progress, preferences, and offline content.</li>
                  <li><strong>Analytics and Performance:</strong> Diagnosing issues, improving performance, and prioritizing new features based on aggregate usage trends.</li>
                  <li><strong>Communication:</strong> Responding to inquiries, providing support, and sending service-related updates (e.g., changes to this Policy, security notices, maintenance windows).</li>
                  <li><strong>Personalization:</strong> Tailoring content, recommendations, and difficulty levels (e.g., in educational tools) to your usage patterns.</li>
                  <li><strong>Safety and Security:</strong> Detecting, investigating, and preventing fraud, abuse, unauthorized access, or violations of our terms.</li>
                  <li><strong>Research and Development:</strong> Improving existing features and developing new ones, generally using aggregated or de-identified data where feasible.</li>
                  <li><strong>Marketing (Where Applicable):</strong> With your consent, sending promotional content or notifying you about new products; you may opt out at any time.</li>
                  <li><strong>Legal Compliance:</strong> Meeting legal, regulatory, tax, and accounting obligations, and responding to lawful requests from public authorities.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. AI Features and Automated Processing</h2>
                <p>
                  Some Services include AI-assisted features, such as tutoring assistants, chatbots, or content-generation tools. Depending on the specific app, these features may be powered by:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>On-device / local models:</strong> Some AI features run entirely on your device (e.g., a quantized local language model) and do not transmit your inputs to any external server.</li>
                  <li><strong>Third-party AI infrastructure providers:</strong> Some AI features send your prompts, questions, or uploaded content to third-party AI providers (which may include providers such as Anthropic or Groq) solely to generate a response. These providers process this data under their own terms and privacy policies, and we select providers that contractually restrict use of your data for their own model training where possible.</li>
                </ul>
                <p className="mt-2">
                  We recommend avoiding submission of sensitive personal information into any AI chat or generative feature. We do not use content you submit to AI features to identify you personally beyond what is necessary to generate and, where applicable, save the response to your account or local device history.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Automated Decision-Making and Profiling</h2>
                <p>
                  Some Services may use automated logic to personalize content, such as adjusting the difficulty of practice questions based on your past performance. We do not use fully automated decision-making that produces legal or similarly significant effects concerning you without an option for human review, except where necessary to enter into or perform a contract, is authorized by law, or is based on your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cookies and Tracking Technologies</h2>
                <p>Our websites and some apps use the following categories of cookies and similar technologies:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Strictly Necessary:</strong> Required for core functionality such as keeping you signed in and maintaining security.</li>
                  <li><strong>Performance/Analytics:</strong> Help us understand aggregate usage patterns and improve our Services.</li>
                  <li><strong>Functional:</strong> Remember your preferences, such as display settings or language.</li>
                  <li><strong>Targeting/Advertising:</strong> Used by advertising partners on apps that display ads, to deliver and measure relevant advertising.</li>
                </ul>
                <p className="mt-2">
                  You can control or disable cookies through your browser settings, and, where applicable, through device-level ad-tracking controls (see Section 27). Disabling certain cookies may affect the functionality of our websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. How We Share Your Information</h2>
                <p>We do not sell your Personal Data for money. We may share information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Service Providers:</strong> Vendors who perform services on our behalf, such as hosting, database, authentication, analytics, and customer-support tools.</li>
                  <li><strong>Advertising Networks:</strong> For apps that display ads, networks that collect device identifiers and usage data to serve and measure ads.</li>
                  <li><strong>AI Infrastructure Providers:</strong> As described in Section 9.</li>
                  <li><strong>Educational Institutions:</strong> Where a Service is deployed for a school or organization, relevant account and progress data may be visible to authorized staff of that institution (e.g., teachers, administrators).</li>
                  <li><strong>Affiliates:</strong> Entities under common ownership or control with us, for purposes consistent with this Policy.</li>
                  <li><strong>Legal and Safety Reasons:</strong> Where required to comply with a legal obligation, respond to lawful requests from public authorities, protect our rights and property, or investigate potential violations of our terms or harm to any person.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to standard confidentiality protections.</li>
                  <li><strong>With Your Consent:</strong> Any other sharing not described above will only occur with your consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Third-Party Service Providers and Sub-Processors</h2>
                <p>Depending on the specific Service, we may engage the following categories of third-party providers to process data on our behalf:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Backend and Hosting:</strong> Firebase / Google Cloud Platform (database, authentication, hosting, cloud storage); static site and web hosting providers.</li>
                  <li><strong>Analytics:</strong> Google Analytics and similar tools for website and app usage analytics.</li>
                  <li><strong>Advertising:</strong> AdMob, Unity Ads, or similar networks for apps that display advertisements.</li>
                  <li><strong>AI Infrastructure:</strong> Providers such as Anthropic or Groq for AI-assisted features that are not fully on-device.</li>
                  <li><strong>Code Execution Sandboxes:</strong> Third-party code-execution services (such as Judge0 or Piston) used by certain educational tools to safely compile and run user-submitted code.</li>
                  <li><strong>Payment Processing:</strong> Third-party payment processors used to handle billing and subscription payments; we do not store full payment card numbers on our own servers.</li>
                  <li><strong>Communication Tools:</strong> Email delivery and customer-support platforms used to respond to inquiries.</li>
                </ul>
                <p className="mt-2">
                  Each sub-processor is contractually required to provide a level of data protection consistent with this Policy and applicable law. A current list of specific sub-processors for a given Service is available upon request.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. International Data Transfers</h2>
                <p>
                  Our Services may be accessed from various countries, and your information may be stored or processed in a country other than your own, including where our service providers (such as Firebase/Google Cloud) operate infrastructure — which may include data centers in the United States, the European Union, or elsewhere. Where required by applicable law (including the GDPR), we rely on appropriate safeguards for such transfers, such as Standard Contractual Clauses, adequacy decisions, or equivalent mechanisms, and we take steps intended to ensure your data receives an adequate level of protection wherever it is processed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Data Security</h2>
                <p>We use reasonable administrative, technical, and physical safeguards designed to protect your information, including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Encryption of data in transit (e.g., HTTPS/TLS) and, where applicable, at rest;</li>
                  <li>Access controls limiting internal access to Personal Data to personnel who need it;</li>
                  <li>Use of reputable, security-audited infrastructure providers (e.g., Firebase/Google Cloud);</li>
                  <li>Regular review of our security practices as our Services evolve.</li>
                </ul>
                <p className="mt-2">
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Data Breach Notification</h2>
                <p>
                  In the event of a data breach affecting your Personal Data that is likely to result in a risk to your rights and freedoms, we will notify affected users and, where required by applicable law, relevant regulatory authorities, without undue delay and in accordance with applicable legal timelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Data Retention</h2>
                <p>
                  We retain Personal Data only for as long as necessary to fulfill the purposes described in this Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. As a general guide:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Account data is retained for as long as your account remains active, plus a reasonable period thereafter to allow for reactivation or legal compliance;</li>
                  <li>Support communications are retained for as long as necessary to resolve your inquiry and for a reasonable period afterward for quality and training purposes;</li>
                  <li>Analytics and log data is generally retained in a reduced or aggregated form after an initial retention window;</li>
                  <li>Locally stored, offline-first data remains on your device under your control until you delete it or uninstall the app.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Children's Privacy</h2>
                <p>
                  Certain Services are educational tools that may be used by students, including minors, typically through a school, parent, or guardian setting up or supervising the account. Where a Service is directed at or knowingly used by children:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>We limit data collection to what is reasonably necessary for the educational functionality (e.g., saving learning progress);</li>
                  <li>We do not knowingly use children's data for behavioral advertising or sell it to third parties;</li>
                  <li>Where required by applicable law (such as COPPA in the United States or equivalent regimes elsewhere), we seek verifiable parental or school consent before collecting Personal Data from a child, typically obtained through the enrolling school or guardian account holder;</li>
                  <li>Parents, guardians, and school administrators may contact us at any time to review, correct, or request deletion of a student's data.</li>
                </ul>
                <p className="mt-2">
                  If we learn that we have collected Personal Data from a child in a manner inconsistent with applicable law, we will take steps to delete that information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Educational Records and School Accounts</h2>
                <p>
                  For Services deployed by a school or academy (e.g., multi-role platforms used by administrators, teachers, matrons, and parents), the school or organization is typically responsible for obtaining any necessary consents from parents/guardians and for determining what student information is entered into the Service. We act as a service provider/processor to the school in this context, and student data is used only to provide the contracted educational functionality, not for our own advertising purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Your Privacy Rights — General</h2>
                <p>Regardless of your location, you generally have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Access the Personal Data we hold about you;</li>
                  <li>Correct inaccurate or incomplete data;</li>
                  <li>Request deletion of your Personal Data and account;</li>
                  <li>Object to or restrict certain processing, including marketing communications;</li>
                  <li>Request a copy of your data in a portable format;</li>
                  <li>Withdraw consent at any time where processing is based on consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Rights of EEA/UK Users (GDPR)</h2>
                <p>If you are located in the European Economic Area or United Kingdom, in addition to the rights in Section 20, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Lodge a complaint with your local data protection supervisory authority;</li>
                  <li>Object to processing based on legitimate interests, including profiling;</li>
                  <li>Not be subject to a decision based solely on automated processing that produces legal or similarly significant effects, subject to the exceptions in Section 10.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Rights of California Residents (CCPA/CPRA)</h2>
                <p>If you are a California resident, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Know what categories of Personal Information we collect, use, disclose, and (if applicable) share, and the categories of sources and third parties involved;</li>
                  <li>Request deletion of Personal Information we have collected from you, subject to certain exceptions;</li>
                  <li>Correct inaccurate Personal Information;</li>
                  <li>Opt out of the "sale" or "sharing" of Personal Information (we do not sell Personal Information for monetary consideration; some advertising-partner integrations on ad-supported apps may constitute "sharing" under CPRA, and we provide an opt-out where applicable);</li>
                  <li>Limit the use of Sensitive Personal Information;</li>
                  <li>Not receive discriminatory treatment for exercising your privacy rights.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Rights of Other U.S. State Residents</h2>
                <p>
                  If you reside in a U.S. state with a comprehensive privacy law (such as Virginia, Colorado, Connecticut, or Utah), you may have similar rights to access, correct, delete, and port your Personal Data, and to opt out of targeted advertising, sale, or certain profiling. We will honor valid requests from residents of these states in accordance with applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">24. Rights of Zimbabwean Users (Cyber and Data Protection Act)</h2>
                <p>
                  As a company operating in Zimbabwe, we aim to process Personal Data in accordance with the Cyber and Data Protection Act [Chapter 12:07]. Zimbabwean users have the right to be informed about processing of their data, to access and correct their data, to object to processing in certain circumstances, and to lodge a complaint with the relevant data protection authority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">25. Rights of Users in Other African Jurisdictions</h2>
                <p>
                  Users in other African jurisdictions with data protection frameworks (for example, South Africa's Protection of Personal Information Act) may have comparable rights to those described in this Policy. We will honor valid requests consistent with applicable local law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">26. How to Exercise Your Rights</h2>
                <p>
                  To exercise any of the rights described in Sections 20–25, contact us using the details in Section 38. To protect your data, we may need to verify your identity before processing certain requests (e.g., by confirming account ownership). We will respond to verifiable requests within a reasonable timeframe and in accordance with applicable law. If we decline a request, we will explain why, and, where applicable, how you may appeal that decision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">27. Do Not Track Signals</h2>
                <p>
                  Some browsers offer a "Do Not Track" setting. Because there is no common industry standard for how to respond to such signals, our Services do not currently respond differently to browsers with Do Not Track enabled. You can still manage tracking through cookie settings and device-level advertising controls.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">28. Advertising, Analytics, and Opt-Out Choices</h2>
                <p>Where applicable, you can manage advertising and analytics tracking through:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Your device's advertising ID settings (e.g., "Limit Ad Tracking" on iOS, "Opt out of Ads Personalization" on Android);</li>
                  <li>Google's Ads Settings and the Google Analytics opt-out browser add-on;</li>
                  <li>Industry opt-out tools such as the Digital Advertising Alliance's consumer choice page, where available in your region.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">29. Push Notifications</h2>
                <p>
                  Some Services may send push notifications for reminders, updates, or new content. You can disable push notifications at any time through your device's operating system settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">30. Marketing Communications</h2>
                <p>
                  Where we send you marketing communications with your consent, you may opt out at any time by using the unsubscribe link in the communication or by contacting us directly. Opting out of marketing communications does not affect service-related messages necessary for account or Service functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">31. Social Media Features</h2>
                <p>
                  Our websites or apps may include social media features, such as share buttons. These features may collect information about your use of the Service and may set cookies to enable their proper functioning. Your interactions with these features are governed by the privacy policy of the company providing them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">32. User-Generated Content</h2>
                <p>
                  If a Service allows you to post, submit, or share content (such as comments, forum posts, or shared documents), that content may be visible to other users or the public, depending on the feature. Please consider carefully what Personal Data you include in any content you choose to share.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">33. Payment Information</h2>
                <p>
                  Where a Service involves paid subscriptions or purchases, payment processing is handled by third-party payment processors. We do not store full payment card numbers on our own servers; we may retain limited billing information (such as transaction history and billing name) necessary for accounting, support, and legal compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">34. Job Applicant and Employment-Related Data</h2>
                <p>
                  If a Service includes a jobs or careers listing feature (for example, on behalf of a school or organization client), information you submit as part of a job application (such as your resume, contact details, and application responses) is used solely to evaluate your application and communicate with you about it, and is shared only with the relevant hiring organization and any recruitment tools used to facilitate the process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">35. Our Role: Controller vs. Processor</h2>
                <p>
                  For most consumer-facing Services, we act as the data Controller, determining the purposes and means of processing your Personal Data. For certain business-to-business deployments (such as school management systems configured for a specific school or academy client), we may act as a Processor on behalf of that client, who acts as the Controller and is responsible for obtaining any necessary consents from end users such as students and parents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">36. Third-Party Links and Services</h2>
                <p>
                  Our Services may contain links to third-party websites, content, or services (for example, embedded video or streaming content) that are not operated by us. We are not responsible for the privacy practices of these third parties, and we encourage you to review their privacy policies before providing any information to them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">37. Accessibility</h2>
                <p>
                  We aim to make our privacy disclosures clear and accessible. If you have a disability and need this Policy provided in an alternative format, please contact us using the details in Section 38 and we will make reasonable efforts to accommodate your request.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">38. Severability</h2>
                <p>
                  If any provision of this Policy is found to be unenforceable or invalid under applicable law, that provision will be limited or eliminated to the minimum extent necessary so that this Policy will otherwise remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">39. Governing Law and Dispute Resolution</h2>
                <p>
                  This Policy is governed by the laws of Zimbabwe, without regard to conflict-of-law principles, except where applicable local law (such as GDPR or CCPA) requires otherwise for users located in those jurisdictions. Any disputes arising from this Policy will first be attempted to be resolved informally by contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">40. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will post the updated Policy with a revised "Last Updated" date, and where changes are material, we will provide additional notice (such as an in-app notification) where appropriate. Continued use of our Services after changes take effect constitutes acceptance of the revised Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">41. Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy, your Personal Data, or data deletion, please contact us at:</p>
                <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-gray-900">Blackgift Tech Labs</p>
                  <p className="mt-1 text-sm text-gray-500">Operating under BG Tech Labs (Pvt) Ltd — Masvingo, Zimbabwe</p>
                  <p className="mt-2">
                    <strong>Email:</strong> <a href="mailto:blackgift00@gmail.com" className="text-blue-600 hover:underline">blackgift00@gmail.com</a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Appendix A: App-Specific Notices</h2>
                <p>
                  Individual apps within our portfolio may have data practices that differ slightly from this general Policy, depending on their functionality (for example, an offline-first educational app versus an ad-supported media player). Where an app displays its own in-app privacy notice, that notice supplements this Policy for that app. Contact us if you would like a summary of the specific data practices for a particular app.
                </p>
              </section>

            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}