import { fetchFormWrapper, fetchUserProfileWrapper } from "../../pages/utils/fetchWrapper/fetchWrapper";


export const userService = {

  getUserProfile: async () => {
    try {
      const response = await fetchUserProfileWrapper.get("/me/");
      return response.data;
    } catch (error) {
      // console.log(error, 'error')
      throw error;
    }
  },
  getAllUsers: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/users-list/?account_type=${payload?.account_type}&search_keyword=${payload?.search_keyword}&page_size=${payload?.page_size}&page_number=${payload?.page_number}`);
      return response.data;
    } catch (error) {
      // console.log(error, 'error')
      throw error;
    }
  },

  getAllServices: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/services/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  inviteMember: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/team-invitations/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  onboardCient: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/client-users/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createJournal: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/journal/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateJournal: async (payload:any,journalId:string) => {
    try {
      const response = await fetchUserProfileWrapper.patch(`/journal/${journalId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateJournalItem: async (payload:any,journalItemId:string) => {
    try {
      const response = await fetchUserProfileWrapper.patch(`/journal-tem-update/${journalItemId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createJournalItem: async (payload:any,clientId:any,accountId:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/journal/item/${clientId}/${accountId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteJournalItem: async (journalItemId:string) => {
    try {
      const response = await fetchUserProfileWrapper.delete(`/journal-item-delete/${journalItemId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteJournal: async (journalId:string) => {
    try {
      const response = await fetchUserProfileWrapper.delete(`/journal/${journalId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  JournalById: async (journalId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/journal/${journalId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  AllJournals: async (companyId:any, accountId:any) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/journal/${companyId}/${accountId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

  deactivateUser: async (payload:any,userId:string) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/deactivate/${userId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateRoleMember: async (payload:any,clientId:string) => {
    try {
      const response = await fetchUserProfileWrapper.put(`/team-members/${clientId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  assignManager: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/assign-manager/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  allManagersList: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/managers/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteMember: async (memberId:string) => {
    try{
      const response = await fetchUserProfileWrapper.delete(`/team-members/${memberId}/`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  clientById: async (clientId:string) => {
    if(!clientId) return;
    try{
      const response = await fetchUserProfileWrapper.get(`/client/${clientId}/`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  adminDashboard: async () => {
    try{
      const response = await fetchUserProfileWrapper.get(`/admin-dashboard/`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  companyById: async (clientId:any) => {
    try{
      const response = await fetchUserProfileWrapper.get(`/client-company/${clientId}/`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  uploadDocument: async (payload:any, clientId:any) => {
    try{
      const response = await fetchFormWrapper.post(`/file-upload/${clientId}/`,payload);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  allInvitedClients: async (payload:any) => {
    let page = payload.page +=1;
    try {
      const response = await fetchUserProfileWrapper.get(`/clients/?page=${page}&search=${payload?.search}&filter_by=${payload?.filter_by}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  clientsByAssigneeId: async (payload:any, assigneeId:any) => {
    if(!assigneeId) return;
    try {
      const response = await fetchUserProfileWrapper.get(`/assigned-clients/${assigneeId}/?page=${payload?.page === 0 ? 1: payload?.page}&search=${payload?.search}&filter_by=${payload?.filter_by}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  allInvitedMembers: async (payload:any) => {
    try {
      let url = `/team-members/?`;
      if (payload?.page !== undefined) {
        url += `page=${payload.page}&`;
      }
      if (payload?.page === 0) {
        url += `page=${1}&`;
      }
      if (payload?.search !== undefined) {
        url += `search=${payload.search}&`;
      }
      if (payload?.filter_by !== undefined) {
        url += `filter_by=${payload.filter_by}`;
      }
      const response = await fetchUserProfileWrapper.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  allSubscribers: async (serviceId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/subscriptions/${serviceId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createService: async (payload:any) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/services/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  sendFileRequest: async (payload:any, clientId:string) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/request-file/${clientId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createClientFolder: async (payload:any, clientId:string) => {
    try {
      const response = await fetchUserProfileWrapper.post(`/createFolder/${clientId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCLientFolders: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/clients-folder/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCLientFiles: async (payload:any, companyId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/clients-files/${companyId}/?page=${payload?.page === 0 ? 1: payload?.page}&search=${payload?.search}&filter_by=${payload?.filter_by}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getFileUrl: async (key:any) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/file-url/?key=${key}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUploadedFilesDetails: async (folderId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/file-details/${folderId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllProfitAndLoss: async (clientId:any,payload:any) => {
    const accountIds = payload?.account_id || [];
    const accountIdsQueryParam = accountIds?.map((id: string) => `account_id=${id}`).join('&');
    try {
      const response = await fetchUserProfileWrapper.get(`/profit-loss-data/${clientId}/?${accountIdsQueryParam}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  generateProfitAndLossPdf: async (payload:any, clientId:any) => {
    const accountIds = payload?.account_id || [];
    const accountIdsQueryParam = accountIds?.map((id: string) => `account_id=${id}`).join('&');
    try {
      const response = await fetchUserProfileWrapper.get(`/profit-loss-pdf/${clientId}/?${accountIdsQueryParam}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  generateFinancialPositionPdf: async (payload:any, clientId:any) => {
    const accountIds = payload?.account_id || [];
    const accountIdsQueryParam = accountIds?.map((id: string) => `account_id=${id}`).join('&');
    try {
      const response = await fetchUserProfileWrapper.get(`/financial-position-pdf/${clientId}/?${accountIdsQueryParam}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllFinancialPosition: async (clientId:any,payload:any) => {
    const accountIds = payload?.account_id || [];
    const accountIdsQueryParam = accountIds?.map((id: string) => `account_id=${id}`).join('&');
    try {
      const response = await fetchUserProfileWrapper.get(`/financial-position-data/${clientId}/?${accountIdsQueryParam}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getValidDateRanges: async (clientId:any) => {        
    try {
      const response = await fetchUserProfileWrapper.get(`/valid-dates/${clientId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getClientDashBoardDetails: async (clientId:string) => {
    if(!clientId) return;
    try {
      const response = await fetchUserProfileWrapper.get(`/clients-dashboard/${clientId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAdminDashBoardDetails: async (adminId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/admin-dashboard/${adminId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getManagerAssinedClient: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/manager-assigned-clients/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getManagerReportPrepared: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/manager-report-prepared/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getManagerUpcomingTax: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/manager-upcoming-tax-deadline/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },



  getAdminActiveClient: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/admin-active-clients/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAdminAssinedClient: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/admin-assigned-clients/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAdminTotalClient: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/admin-total-clients/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAdminTotalMrr: async () => {
    try {
      const response = await fetchUserProfileWrapper.get(`/admin-total-mrr/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getManagerDashBoardDetails: async (managerId:string) => {
    try {
      const response = await fetchUserProfileWrapper.get(`/manager-dashboard/${managerId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deactivateService: async (payload:any, serviceId:string) => {
    try {
      const response = await fetchUserProfileWrapper.patch(`/services/${serviceId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteService: async (serviceId:string) => {
    try {
      const response = await fetchUserProfileWrapper.delete(`/services/${serviceId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateService: async (payload:any, serviceId:string) => {
    try {
      const response = await fetchUserProfileWrapper.put(`/services/${serviceId}/`,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 
}
export default userService;
