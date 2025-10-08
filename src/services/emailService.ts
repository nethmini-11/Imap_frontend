import type { Email, EmailListResponse } from '../types';
import { api } from './api';

export interface SyncResponse {
  success: boolean;
  message: string;
  data: {
    synced: number;
    total: number;
  };

}

export interface EmailStats {
  total: number;
  unread: number;
  read: number;
  
}

export interface PrepareReplyResponse {
  success: boolean;
  data: {
    originalEmail: Email;
    replyData: {
      to: string[];
      subject: string;
      body: string;
      cc?: string[];
      bcc?: string[];
      threadId?: string;
      inReplyTo?: string;
    };
  };
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  data: any;
}

class EmailService {
  async syncEmails(): Promise<SyncResponse> {
    const response = await api.post<SyncResponse>('/emails/sync');
    
    return response.data;
  }

  async getEmails(page: number = 1, limit: number = 20, search?: string, unreadOnly?: boolean): Promise<EmailListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(unreadOnly && { unreadOnly: 'true' }),
    });

    const response = await api.get<{ success: boolean; data: EmailListResponse }>(`/emails?${params}`);
    return response.data.data;
  }

  async getEmailById(id: number): Promise<Email> {
    const response = await api.get<{ success: boolean; data: Email }>(`/emails/${id}`);
    return response.data.data;
  }

  async markAsRead(id: number): Promise<Email> {
    const response = await api.patch<{ success: boolean; data: Email }>(`/emails/${id}/read`);
    return response.data.data;
  }

  async getStats(): Promise<EmailStats> {
    const response = await api.get<{ success: boolean; data: EmailStats }>('/emails/stats');
    return response.data.data;
  }

  async prepareReply(emailId: number, type: 'reply' | 'forward'): Promise<PrepareReplyResponse['data']> {
    const response = await api.get<PrepareReplyResponse>(`/emails/${emailId}/prepare-reply?type=${type}`);
    return response.data.data;
  }

  async sendEmail(emailData: any): Promise<SendEmailResponse> {
    const response = await api.post<SendEmailResponse>('/emails/send', emailData);
    return response.data;
  }
}

export const emailService = new EmailService();