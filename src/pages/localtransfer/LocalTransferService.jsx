import { apiPost } from "../utils/api";

export const LOCAL_TRANSFER_URL = "/api/v1/transfer/local";

class LocalTransferService {
    async saveTransaction(user, header) {
        const response = await apiPost(LOCAL_TRANSFER_URL, user, header, true)
        console.log(response.data);
        return response.data;
    }
}

export default new LocalTransferService();