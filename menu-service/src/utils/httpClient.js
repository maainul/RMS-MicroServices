import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create Axios instance
const httpClient = axios.create({
    timeout: 5000, // optional timeout in ms
    headers: {
        'Content-Type': 'application/json'
    }
});

// Apply retry logic
axiosRetry(httpClient, {
    retries: 3, // Number of retry attempts
    retryDelay: (retryCount) => retryCount * 1000, // 1s, 2s, 3s
    retryCondition: (error) => {
        return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
    },
});

export default httpClient;
