// src/core/hooks/useCreateOrder.js
import api from "@/core/api/api"

export function useCreateOrder() {
  const createOrder = async (orderData) => {
    try {
      const res = await api.post("/orders", orderData)
      return res.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la orden"

      throw new Error(message)
    }
  }

  return { createOrder }
}
