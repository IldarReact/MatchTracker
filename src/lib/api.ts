import type { ApiResponse } from "./types"

const API_BASE_URL = "https://app.ftoyd.com/fronttemp-service"

export async function fetchMatches(): Promise<ApiResponse["data"]> {
  try {
    const response = await fetch(`${API_BASE_URL}/fronttemp`)

    if (!response.ok) {
      throw new Error(`API вернул статус: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    if (!data.ok) {
      throw new Error("API вернул ошибку")
    }

    return data.data
  } catch (error) {
    console.error("Ошибка при загрузке матчей:", error)
    throw error
  }
}

