import api from "./AxiosInstance";

const getThreads = async () => {

    const response = await api.get("/threads");

    return response.data;
};

export default getThreads;