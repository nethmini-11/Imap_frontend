import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useEmails } from "../hooks/useEmails";
import type { Email } from "../types";
import { Header } from "../components/layout/Header";
import { Filter, RefreshCw, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { EmailList } from "../components/emails/EmailList";
import { EmailDetail } from "../components/emails/EmailDetail";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { emails, filters, setFilters, fetchEmailStats, syncStatus } =
    useEmails();

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    fetchEmailStats();
  }, []);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const toggleUnreadOnly = () => {
    setFilters({ unreadOnly: !filters.unreadOnly });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Email List */}
        <div
          className={`
          md:w-96 bg-white border-r border-gray-200 flex flex-col
          ${
            isMobileSidebarOpen
              ? "absolute inset-0 z-40 md:relative"
              : "hidden md:flex"
          }
        `}
        >
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search emails..."
                value={filters.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant={filters.unreadOnly ? "primary" : "outline"}
                size="sm"
                onClick={toggleUnreadOnly}
                icon={Filter}
                className={
                  filters.unreadOnly
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                    : ""
                }
              >
                Unread Only
              </Button>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <RefreshCw
                  className={`w-4 h-4 ${
                    syncStatus === "syncing" ? "animate-spin" : ""
                  }`}
                />
                <span>{emails.length} emails</span>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto p-4">
            <EmailList
              onEmailSelect={handleEmailSelect}
              selectedEmailId={selectedEmail?.id}
            />
          </div>
        </div>

        {/* Main Content - Email Detail */}
        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <EmailDetail
              email={selectedEmail}
              onBack={() => setSelectedEmail(null)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Email Selected
                </h3>
                <p className="text-gray-500">
                  Select an email from the list to view its content
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="md:hidden fixed bottom-4 right-4 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
