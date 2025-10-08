import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Email, EmailState } from '../../types';
import { emailService } from '../../services/emailService';

const initialState: EmailState = {
    emails: [],
    currentEmail: null,
    stats: {
        total: 0,
        unread: 0,
        read: 0,
    },
    filters: {
        search: '',
        unreadOnly: false,
        page: 1,
        limit: 20,
    },
    isLoading: false,
    syncStatus: 'idle',
    composerState: {
        isOpen: false,
        mode: null,
        data: null,
    },
};


export const syncEmails = createAsyncThunk("emails/sync", async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await emailService.syncEmails();

    setTimeout(async () => {
      await dispatch(fetchEmails({}));
      await dispatch(fetchEmailStats());
    }, 12000);

    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Sync failed");
  }
});

export const fetchEmails = createAsyncThunk(
    'emails/fetch',
    async (params: { page?: number; search?: string; unreadOnly?: boolean } = {}, { rejectWithValue }) => {
        try {
            const response = await emailService.getEmails(
                params.page || 1,
                20,
                params.search,
                params.unreadOnly
            );
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch emails');
        }
    }
);

export const fetchEmailById = createAsyncThunk(
    'emails/fetchById',
    async (id: number, { rejectWithValue }) => {
        try {
            const email = await emailService.getEmailById(id);
            return email;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch email');
        }
    }
);

export const markEmailAsRead = createAsyncThunk(
    'emails/markAsRead',
    async (id: number, { rejectWithValue }) => {
        try {
            const email = await emailService.markAsRead(id);
            return email;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
        }
    }
);

export const fetchEmailStats = createAsyncThunk(
    'emails/stats',
    async (_, { rejectWithValue }) => {
        try {
            const stats = await emailService.getStats();
            return stats;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
        }
    }
);

const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<EmailState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload, page: 1 };
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                unreadOnly: false,
                page: 1,
                limit: 20,
            };
        },
        setCurrentEmail: (state, action: PayloadAction<Email | null>) => {
            state.currentEmail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(syncEmails.pending, (state) => {
                state.syncStatus = 'syncing';
                state.isLoading = true;

            })
            .addCase(syncEmails.fulfilled, (state, action) => {
                state.syncStatus = 'success';
            })
            .addCase(syncEmails.rejected, (state) => {
                state.syncStatus = 'error';
            })

            .addCase(fetchEmails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emails = action.payload.emails;
                state.stats.total = action.payload.total;
            })
            .addCase(fetchEmails.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(fetchEmailById.fulfilled, (state, action) => {
                state.currentEmail = action.payload;

                const emailIndex = state.emails.findIndex(email => email.id === action.payload.id);
                if (emailIndex !== -1) {
                    state.emails[emailIndex].is_read = true;
                }
            })

            .addCase(markEmailAsRead.fulfilled, (state, action) => {
                const emailIndex = state.emails.findIndex(email => email.id === action.payload.id);
                if (emailIndex !== -1) {
                    state.emails[emailIndex].is_read = true;
                }
                if (state.currentEmail?.id === action.payload.id) {
                    state.currentEmail.is_read = true;
                }
            })

            .addCase(fetchEmailStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
            
    },
});

export const { setFilters, clearFilters, setCurrentEmail } = emailSlice.actions;
export default emailSlice.reducer;