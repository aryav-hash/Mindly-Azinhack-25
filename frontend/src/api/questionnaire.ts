export type QuestionnaireRun = {
  userId?: string | number
  timestamp: string
  responses: Record<string, number>
}

type ApiResult<T> = {
  ok: boolean
  status: number
  data?: T
  error?: string
}

const BASE_URL = (import.meta as any)?.env?.VITE_BACKEND_URL || 'http://localhost:5000'

/**
 * Store the latest questionnaire run for a user.
 * This only POSTs JSON to the backend; no chatbot integration is performed here.
 */
export async function saveLatestQuestionnaire(run: QuestionnaireRun): Promise<ApiResult<{ saved: boolean }>> {
  try {
    const res = await fetch(`${BASE_URL}/api/questionnaire/latest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: run.userId ?? null,
        timestamp: run.timestamp,
        responses: run.responses,
      }),
    })

    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const body = isJson ? await res.json() : undefined

    if (!res.ok) {
      return { ok: false, status: res.status, error: (body as any)?.error || 'Failed to save' }
    }
    return { ok: true, status: res.status, data: { saved: true } }
  } catch (err: any) {
    return { ok: false, status: 0, error: err?.message || 'Network error' }
  }
}

/**
 * Optional helper to fetch the latest questionnaire for a user from the backend.
 */
export async function fetchLatestQuestionnaire(userId?: string | number): Promise<ApiResult<any>> {
  try {
    const url = userId ? `${BASE_URL}/api/questionnaire/latest?userId=${encodeURIComponent(String(userId))}` : `${BASE_URL}/api/questionnaire/latest`
    const res = await fetch(url)
    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const body = isJson ? await res.json() : undefined
    if (!res.ok) return { ok: false, status: res.status, error: (body as any)?.error || 'Failed to fetch' }
    return { ok: true, status: res.status, data: body }
  } catch (err: any) {
    return { ok: false, status: 0, error: err?.message || 'Network error' }
  }
}


