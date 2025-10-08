import { useEffect } from "react";
import { useEmails } from "../../hooks/useEmails";
import type { Email } from "../../types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Clock, Mail, Paperclip } from "lucide-react";

interface EmailListProps {
  onEmailSelect: (email: Email) => void;
  selectedEmailId?: number;
}

export const EmailList: React.FC<EmailListProps> = ({
  onEmailSelect,
  selectedEmailId,
}) => {
  const { emails, isLoading, fetchEmails, filters } = useEmails();
  useEffect(() => {
    fetchEmails(filters);
  }, [filters]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onEmailSelect(email)}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
            selectedEmailId === email.id
              ? "bg-primary-50 border-primary-200 shadow-sm"
              : "bg-white border-gray-200 hover:shadow-md"
          } ${!email.is_read ? "border-l-4 border-l-primary-500" : ""}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate">
                  {email.from.split("<")[0].trim()}
                </p>
                <p className="text-xs text-gray-500">
                  to {email.to.split("<")[0].trim()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatDate(email.date)}</span>
            </div>
          </div>

          <div className="mb-2">
            <h3
              className={`font-semibold mb-1 ${
                !email.is_read ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {email.subject || "(No Subject)"}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {truncateText(email.snippet || email.body_text || "", 120)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {email.has_attachments && (
                <Paperclip className="w-3 h-3 text-gray-400" />
              )}
              {email.labels.length > 0 && (
                <div className="flex items-center space-x-1">
                  {email.labels.slice(0, 2).map((label) => (
                    <span
                      key={label}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {!email.is_read && (
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
            )}
          </div>
        </div>
      ))}

      {emails.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No emails found</p>
          <p className="text-sm text-gray-400">
            Try syncing your emails or adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
};
