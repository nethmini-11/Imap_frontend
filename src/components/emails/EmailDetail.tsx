import { ArrowLeft, Tag, Paperclip, Calendar, User, Clock } from "lucide-react";
import type { Email } from "../../types";
import { useEmails } from "../../hooks/useEmails";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email, onBack }) => {
  const { markEmailAsRead } = useEmails();
  const [parsedHtml, setParsedHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const parseEmailContent = async () => {
      if (email.body_html || email.body_text) {
        setIsLoading(true);
        try {
          if (email.body_html) {
            setParsedHtml(email.body_html);
          } else if (email.body_text) {
            const formattedText = email.body_text
              .replace(/\n/g, "<br>")
              .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
              .replace(/  /g, "&nbsp;&nbsp;");
            setParsedHtml(
              `<div class="plain-text-content">${formattedText}</div>`
            );
          }
        } catch (error) {
          console.error("Error processing email content:", error);
          setParsedHtml(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setParsedHtml(null);
        setIsLoading(false);
      }
    };

    parseEmailContent();
  }, [email.body_html, email.body_text]);

  useEffect(() => {
    if (!email.is_read) {
      markEmailAsRead(email.id);
    }
  }, [email.id, email.is_read, markEmailAsRead]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const extractEmailAddress = (emailString: string): string => {
    const match = emailString.match(/<(.+)>/);
    return match ? match[1] : emailString;
  };

  const extractName = (emailString: string): string => {
    const match = emailString.match(/(.+)\s*</);
    return match ? match[1].trim() : emailString;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading email content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
     <div className="flex-1 flex flex-col bg-red min-h-0">
  {/* Header */}
  <div className="border-b border-gray-200 p-6 flex-shrink-0">
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="ghost"
        size="sm"
        icon={ArrowLeft}
        onClick={onBack}
        className="md:hidden"
      >
        Back
      </Button>
    </div>

    {/* Email Metadata */}
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {email.subject || "(No Subject)"}
        </h1>

        {!email.is_read && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            Unread
          </span>
        )}
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {extractName(email.from)}
            </p>
            <p className="text-sm text-secondary-500">
              to {extractName(email.to)}
            </p>
          </div>
        </div>

        <div className="text-right text-sm text-secondary-500">
          <div className="flex items-center space-x-1 justify-end mb-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(email.date)}</span>
          </div>
          <div className="flex items-center space-x-1 justify-end">
            <Clock className="w-4 h-4" />
            <span>{new Date(email.date).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Labels and Attachments */}
      <div className="flex items-center space-x-4">
        {email.labels && email.labels.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-secondary-400" />
            <div className="flex flex-wrap gap-1">
              {email.labels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {email.has_attachments && (
          <div className="flex items-center space-x-2 text-secondary-500">
            <Paperclip className="w-4 h-4" />
            <span className="text-sm">Has attachments</span>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Email Body*/}
  <div className="flex-1 overflow-y-auto min-h-0">
    <div className="p-6 prose prose-lg max-w-none">
      {parsedHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
          className="email-content"
        />
      ) : email.body_text ? (
        <div className="whitespace-pre-wrap text-secondary-700">
          {email.body_text}
        </div>
      ) : (
        <div className="text-secondary-500 italic">
          No content available
        </div>
      )}
    </div>

    {/* Attachments Section */}
    {email.has_attachments && (
      <div className="border-t border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Attachments
        </h3>
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <p className="text-secondary-600 text-sm">
            Attachments are available in your Gmail account. Please check
            the original email in Gmail to download files.
          </p>
        </div>
      </div>
    )}
  </div>
</div>
    </>
  );
};
