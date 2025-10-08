import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useEmails } from "../../hooks/useEmails";
import { Button } from "../ui/Button";
import { LogOut, Mail, User, RefreshCw } from "lucide-react";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { syncEmails, syncStatus, stats } = useEmails();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSync = async () => {
    await syncEmails();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-purple-900 p-2 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MailView</h1>
              <p className="text-sm text-gray-500">Gmail IMAP Client</p>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center space-x-4">
            {/* Sync Button */}
            <Button
              variant="outline"
              size="sm"
              loading={syncStatus === "syncing"}
              icon={RefreshCw}
              onClick={handleSync}
            >
              {syncStatus === "syncing" ? "Syncing..." : "Sync Emails"}
            </Button>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Total: {stats.total}</span>
              <span>Unread: {stats.unread}</span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => logout()}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
