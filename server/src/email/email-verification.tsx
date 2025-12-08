import { Mail, CheckCircle2, Shield } from "lucide-react";

type EmailVerifyProps = {
  user: string,
  verifyUrl: string,
}

const EmailVerification = ({ user, verifyUrl }: EmailVerifyProps) => {
  return (
    <div className="min-h-screen bg-email-bg flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] animate-fade-in">
        {/* Email Container */}
        <div className="bg-email-card rounded-xl shadow-email-lg border border-email-border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/5 border-b border-email-border px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-email-text">YourApp</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-email-text text-center mb-3">
              Verify your email address
            </h1>

            {/* Description */}
            <p className="text-email-text-muted text-center mb-8 leading-relaxed">
              Hello <span className="font-semibold">{user}</span>, Thanks for signing up! Please click the button below to verify your email address and activate your account.
            </p>

            {/* Button */}
            <div className="flex justify-center mb-8">
              <a
                href={verifyUrl}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-email-accent-hover transition-all duration-200 shadow-email hover:shadow-email-lg transform hover:-translate-y-0.5"
              >
                Verify Email Address
              </a>
            </div>

            {/* Alternative Link */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-email-text-muted text-center mb-2">
                Or copy and paste this link into your browser:
              </p>
              <p className="text-xs text-primary break-all text-center font-mono bg-background rounded px-3 py-2">
                {verifyUrl}
              </p>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-3 text-sm text-email-text-muted">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-email-text-muted" />
              <p>
                This link will expire in 1 hour. If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted/30 border-t border-email-border px-8 py-6">
            <p className="text-sm text-email-text-muted text-center mb-3">
              Need help?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
            <p className="text-xs text-email-text-muted/70 text-center">
              © 2025 adAstra. All rights reserved.
              <br />
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>

        {/* Preview Label */}
        <p className="text-center text-sm text-email-text-muted mt-6">
          Email Preview
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
