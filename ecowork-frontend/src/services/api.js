const API_URL = window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000/api'
    : 'https://api-raffaa.ifran-b3dev.com/api';


function getHeaders() {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

async function handleResponse(response) {
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Votre session a expiré, connectez-vous à nouveau.');
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Oups, un problème est survenu');
    }

    return response.json();
};

export const post = async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })

    return handleResponse(response)
};

export const get = async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
    })

    return handleResponse(response)
}

export const put = async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });

    return handleResponse(response)
}

export const del = async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    return handleResponse(response)
}