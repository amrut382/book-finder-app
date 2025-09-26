import React, { useState, useEffect } from 'react'
import { Search, BookOpen, User, Calendar, Star, Filter, Loader2 } from 'lucide-react'
import BookCard from './components/BookCard'
import SearchFilters from './components/SearchFilters'
import { searchBooks } from './services/bookService'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('title')
  const [sortBy, setSortBy] = useState('title A-Z')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const results = await searchBooks(searchQuery, searchType, sortBy)
      setBooks(results)
    } catch (err) {
      setError('Failed to search books. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickSearch = (query) => {
    setSearchQuery(query)
    setSearchType('title')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Book Finder</h1>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">
              Discover your next great read
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Book
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search through millions of books by title, author, subject, or ISBN. 
            Perfect for college students looking for their next academic or leisure read.
          </p>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Harry Potter', 'Machine Learning', 'Shakespeare', 'Python Programming', 'Psychology'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleQuickSearch(suggestion)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 hover:border-primary-300 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for books..."
                    className="search-input pl-10"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="btn-primary flex items-center justify-center space-x-2 min-w-[120px]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{loading ? 'Searching...' : 'Search'}</span>
              </button>
            </div>

            <SearchFilters
              searchType={searchType}
              setSearchType={setSearchType}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Search Results
              </h3>
              {books.length > 0 && (
                <p className="text-gray-600">
                  Found {books.length} book{books.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                <span className="ml-2 text-gray-600">Searching books...</span>
              </div>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <BookCard key={`${book.key || book.title}-${index}`} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-gray-900 mb-2">No books found</h4>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find more results.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Search by title, author, subject, or ISBN with intelligent matching algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Details</h3>
              <p className="text-gray-600">
                Get comprehensive book information including covers, descriptions, and ratings.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Filter className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Filters</h3>
              <p className="text-gray-600">
                Sort and filter results to find exactly what you're looking for.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Powered by Open Library API • Built for students by students</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
