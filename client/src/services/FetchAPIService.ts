export default class FetchAPIService {
  private static baseURL: string = 'http://localhost:8000/api'

  static async get(url: string): Promise<any> {
    let response
    try {
      response = await fetch(this.baseURL + url, { mode: 'cors', method: 'GET' })
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('Network Error in FetchAPI Service: ', error)
      throw error
    }

    try {
      if (response) {
        const data = await response.text()
        return JSON.parse(data)
      }
    } catch (error) {
      throw new Error('Error parsing JSON')
    }
  }

  static async post(url: string, data: any): Promise<any> {
    let response
    try {
      response = await fetch(this.baseURL + url, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('Network Error in FetchAPI Service: ', error)
      throw error
    }

    try {
      if (response) {
        const data = await response.text()
        return JSON.parse(data)
      }
    } catch (error) {
      throw new Error('Error parsing JSON')
    }
  }
}
