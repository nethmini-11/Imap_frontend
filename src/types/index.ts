export interface User {
  id: number;
  email: string;
  name: string;
  picture?: string;
  last_sync_at?: string;
}

export interface Email {
  id: number;
  user_id: number;
  message_id: string;
  thread_id: string;
  subject: string;
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  body_text?: string;
  body_html?: string;
  date: string;
  has_attachments: boolean;
  is_read: boolean;
  labels: string[];
  snippet?: string;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface EmailSearchOptions {
  page?: number;
  limit?: number;
  search?: string;
  unreadOnly?: boolean;
}

export interface EmailStats {
  total: number;
  unread: number;
  read: number;
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
export interface ComposerState {
  isOpen: boolean;
  mode: 'reply' | 'forward' | null;
  data: any;
}
export interface EmailState {
  emails: Email[];
  currentEmail: Email | null;
  stats: {
    total: number;
    unread: number;
    read: number;
  };
  filters: {
    search: string;
    unreadOnly: boolean;
    page: number;
    limit: number;
  };
  isLoading: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
    composerState: ComposerState;

}