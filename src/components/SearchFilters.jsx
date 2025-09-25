import React from 'react'
import { Filter } from 'lucide-react'

const SearchFilters = ({ searchType, setSearchType, sortBy, setSortBy }) => {
  const searchTypes = [
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'subject', label: 'Subject' },
    { value: 'isbn', label: 'ISBN' },
    { value: 'publisher', label: 'Publisher' }
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' }
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Search by:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {searchTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSearchType(type.value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
              searchType === type.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2 ml-auto">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SearchFilters
