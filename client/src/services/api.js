import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('savoria_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock Service API Wrappers for smooth client fallback
export const mockCreateOrder = async (orderPayload) => {
  try {
    const response = await apiClient.post('/orders', orderPayload);
    return response.data;
  } catch (error) {
    return {
      success: true,
      data: {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        billing: orderPayload.billing,
        pricing: orderPayload.pricing,
      }
    };
  }
};

export const mockSubmitReservation = async (reservationPayload) => {
  try {
    const response = await apiClient.post('/reservations', reservationPayload);
    return response.data;
  } catch (error) {
    return {
      success: true,
      bookingId: 'SAV-' + Math.floor(100000 + Math.random() * 900000),
      message: 'Table reservation created successfully',
      data: reservationPayload
    };
  }
};

export const mockCreateReservation = mockSubmitReservation;

export const mockSubmitReview = async (reviewPayload) => {
  try {
    const response = await apiClient.post('/reviews', reviewPayload);
    return response.data;
  } catch (error) {
    return {
      success: true,
      message: 'Thank you! Your review has been published.',
      data: reviewPayload
    };
  }
};

export const mockSubscribeNewsletter = async (email) => {
  return {
    success: true,
    message: `Thank you! ${email} has been subscribed to Thin Nation VIP offers.`,
  };
};
