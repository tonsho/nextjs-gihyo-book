export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const res = await fetch(resource, init)

  if (!res.ok) {
    const errorRes = await res.text()
    console.error(`${res.status} ${res.statusText}`)
    console.error(errorRes)
    let errorMsg: string
    try {
      const errorResJson = JSON.parse(errorRes)
      errorMsg = errorResJson.message
    } catch {
      errorMsg = 'APIリクエスト中にエラーが発生しました。'
    }
    throw new Error(`${resource} ${errorMsg}`)
  }

  return res.json()
}
