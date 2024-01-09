import axios from 'axios'
import { API_URL } from '@/assets/constants'

export function useHelpers () {
  function updateMeta (meta: { description?: string, keywords?: string, title?: string }) {
    if (meta.description) {
      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute('content', meta.description)
      }
    }

    if (meta.keywords) {
      const keywords = document.querySelector('meta[name="keywords"]')
      if (keywords) {
        keywords.setAttribute('content', meta.keywords)
      }
    }

    if (meta.title) {
      document.title = meta.title
    }
  }

  function validateEmail (email: string): boolean {
    return !!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  async function sendEmail (email: string) {
    return await axios.post(`${API_URL}subscribe/email?subscriberEmail=${email}`)
  }

  async function getImageDimensions (file: File): Promise<{width: number, height: number}> {
    return await new Promise((resolve) => {
      // Create a FileReader
      const reader = new FileReader()

      // Event handler executed when the file is read
      reader.onload = (event) => {
        // Create an image
        const img = new Image()

        // Set up onload event handler for the image
        img.onload = () => {
          // Resolve the promise with the width and height
          resolve({ width: img.width, height: img.height })
        }

        // Set up onerror event handler for the image
        img.onerror = () => {
          throw new Error('Error in loading image')
        }

        if (event.target && typeof event.target.result === 'string') {
          img.src = event.target.result
        }
      }

      // Read the file as Data URL
      reader.readAsDataURL(file)
    })
  }

  return { updateMeta, validateEmail, sendEmail, getImageDimensions }
}
