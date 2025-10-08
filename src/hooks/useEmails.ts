import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { clearFilters, fetchEmailById, fetchEmails, fetchEmailStats, markEmailAsRead, setFilters, syncEmails } from '../store/slices/emailSlice';


export const useEmails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emails, currentEmail, stats, filters, isLoading, syncStatus } = useSelector(
    (state: RootState) => state.emails
  );

  return {
    emails,
    currentEmail,
    stats,
    filters,
    isLoading,
    syncStatus,
    syncEmails: () => dispatch(syncEmails()),
    fetchEmails: (params?: any) => dispatch(fetchEmails(params)),
    fetchEmailById: (id: number) => dispatch(fetchEmailById(id)),
    markEmailAsRead: (id: number) => dispatch(markEmailAsRead(id)),
    fetchEmailStats: () => dispatch(fetchEmailStats()),
    setFilters: (filters: any) => dispatch(setFilters(filters)),
    clearFilters: () => dispatch(clearFilters()),
  };
};