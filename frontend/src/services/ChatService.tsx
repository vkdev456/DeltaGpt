import type { PromptRequest } from "../models/PromptRequest";
import api from "./AxiosInstance";

const sendPrompt = async (request: PromptRequest) => {

    const response = await api.post(
        "/chat",
        request
    );

    return response.data;
};

export default sendPrompt;