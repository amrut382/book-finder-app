const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org'
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

/**
 * Search for books using the Open Library Search API
 * @param {string} query - The search query
 * @param {string} searchType - Type of search (title, author, subject, isbn, publisher)
 * @param {string} sortBy - Sort order (relevance, newest, oldest, title, author)
 * @returns {Promise<Array>} Array of book objects
 */
export const searchBooks = async (query, searchType = 'title', sortBy = 'relevance') => {
  try {
    // Build search parameters based on search type
    let searchParams = new URLSearchParams()
    
    switch (searchType) {
      case 'title':
        searchParams.append('title', query)
        break
      case 'author':
        searchParams.append('author', query)
        break
      case 'subject':
        searchParams.append('subject', query)
        break
      case 'isbn':
        searchParams.append('isbn', query)
        break
      case 'publisher':
        searchParams.append('publisher', query)
        break
      default:
        searchParams.append('q', query)
    }

    // Add sorting parameters
    switch (sortBy) {
      case 'newest':
        searchParams.append('sort', 'new')
        break
      case 'oldest':
        searchParams.append('sort', 'old')
        break
      case 'title':
        searchParams.append('sort', 'title')
        break
      case 'author':
        searchParams.append('sort', 'author')
        break
      default:
        searchParams.append('sort', 'relevance')
    }

    // Add additional parameters for better results
    searchParams.append('limit', '20')
    searchParams.append('offset', '0')
    searchParams.append('has_fulltext', 'true')
    searchParams.append('language', 'eng')

    const url = `${OPEN_LIBRARY_BASE_URL}/search.json?${searchParams.toString()}`
    
    console.log('Searching with URL:', url)
    
    // Try direct fetch first
    let response
    try {
      response = await fetch(url)
    } catch (corsError) {
      console.log('Direct fetch failed, trying CORS proxy:', corsError)
      const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`
      console.log('Using proxy URL:', proxyUrl)
      response = await fetch(proxyUrl)
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid response format from Open Library API')
    }
    
    // Process and clean the book data
    const processedBooks = data.docs.map(book => ({
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
      cover_i: book.cover_i,
      isbn: book.isbn,
      subject: book.subject,
      publisher: book.publisher,
      ratings_average: book.ratings_average,
      ratings_count: book.ratings_count,
      first_sentence: book.first_sentence,
      language: book.language,
      edition_count: book.edition_count,
      has_fulltext: book.has_fulltext,
      public_scan_b: book.public_scan_b
    }))
    
    return processedBooks
    
  } catch (error) {
    console.error('Error searching books:', error)
    throw new Error(`Failed to search books: ${error.message}`)
  }
}

/**
 * Get detailed information about a specific book
 * @param {string} bookKey - The Open Library key for the book
 * @returns {Promise<Object>} Detailed book information
 */
export const getBookDetails = async (bookKey) => {
  try {
    const url = `${OPEN_LIBRARY_BASE_URL}${bookKey}.json`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching book details:', error)
    throw new Error(`Failed to fetch book details: ${error.message}`)
  }
}

/**
 * Get book cover image URL
 * @param {string} coverId - The cover ID from Open Library
 * @param {string} size - Size of the cover (S, M, L)
 * @returns {string} Cover image URL
 */
export const getCoverImageUrl = (coverId, size = 'M') => {
  if (!coverId) return null
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

/**
 * Get author information
 * @param {string} authorKey - The Open Library author key
 * @returns {Promise<Object>} Author information
 */
export const getAuthorInfo = async (authorKey) => {
  try {
    const url = `${OPEN_LIBRARY_BASE_URL}${authorKey}.json`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching author info:', error)
    throw new Error(`Failed to fetch author info: ${error.message}`)
  }
}
