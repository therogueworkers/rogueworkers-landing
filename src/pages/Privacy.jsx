import React from 'react';

const Privacy = () => {
    return (
        <div className="legal-content">
            <h1>Privacy Policy</h1>
            <span className="last-updated">Effective Date: March 8, 2026</span>

            <p>
                At Rogue Workers, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us through our platform.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information when you use our services:</p>
            <ul>
                <li><strong>Contact Data:</strong> Name, email address, and other contact details.</li>
                <li><strong>Account Data:</strong> Credentials and preferences associated with your account.</li>
                <li><strong>Demographic Data:</strong> Information such as location and professional background.</li>
                <li><strong>User-Generated Content:</strong> Reviews, salary data, interview experiences, and other submissions.</li>
                <li><strong>Employment/Financial Data:</strong> Information provided for negotiation services.</li>
                <li><strong>Automatic Device Data:</strong> IP addresses, browser types, and usage statistics collected via cookies and similar technologies.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
                <li>To provide, maintain, and improve our services (service delivery).</li>
                <li>To conduct research and development for new features.</li>
                <li>To send you updates, marketing communications, and promotional offers.</li>
                <li>To monitor compliance with our terms and protect our platform and users.</li>
            </ul>

            <h2>3. Sharing of Information</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
                <li><strong>Service Providers:</strong> We share data with third-party vendors (e.g., Stripe for payments) who assist us in operating the platform.</li>
                <li><strong>Affiliates:</strong> We may share information within our corporate family.</li>
                <li><strong>Employers:</strong> If you explicitly initiate a job application through our platform, relevant information may be shared with the prospective employer.</li>
                <li><strong>Legal Compliance:</strong> We may disclose information if required by law or to protect our rights.</li>
            </ul>

            <h2>4. Your Choices</h2>
            <p>You have control over your data. You can:</p>
            <ul>
                <li>Opt-out of marketing communications by following the instructions in those emails.</li>
                <li>Manage your cookie preferences through your browser settings.</li>
                <li>Request the deletion of your account and personal data by contacting us at <strong>team@rogueworkers.com</strong>.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
                We implement robust technical and organizational measures to protect your data against unauthorized access, loss, or misuse.
                However, no system is completely secure, and we cannot guarantee the absolute security of your information.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy
                on our website and updating the "Effective Date."
            </p>

            <p style={{ marginTop: '3rem' }}>
                If you have any questions or concerns about this Privacy Policy, please contact us at team@rogueworkers.com.
            </p>
        </div>
    );
};

export default Privacy;
