import React from 'react'
import { Calendar, User, Star, ExternalLink } from 'lucide-react'

const BookCard = ({ book }) => {
  const getCoverImage = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    }
    return '/book-placeholder.png'
  }

  const getAuthors = (book) => {
    if (book.author_name && Array.isArray(book.author_name)) {
      return book.author_name.join(', ')
    }
    return book.author_name || 'Unknown Author'
  }

  const getFirstSentence = (book) => {
    if (book.first_sentence && Array.isArray(book.first_sentence)) {
      return book.first_sentence[0]
    }
    return book.first_sentence || ''
  }

  const getSubjects = (book) => {
    if (book.subject && Array.isArray(book.subject)) {
      return book.subject.slice(0, 3).join(', ')
    }
    return book.subject || ''
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const year = Array.isArray(dateString) ? dateString[0] : dateString
    return year.toString()
  }

  return (
    <div className="book-card p-4 h-full flex flex-col">
      {/* Book Cover */}
      <div className="flex justify-center mb-4">
        <img
          src={getCoverImage(book)}
          alt={book.title}
          className="w-32 h-48 object-cover rounded-lg shadow-md"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDEyOCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA2NEg4OFY4OEg0MFY2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+YXRoIGQ9Ik00MCA5Nkg4OFYxMjBINDBWOTZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik00MCAxMjhIODhWMTUySDQwVjEyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
          }}
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{getAuthors(book)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(book.first_publish_year)}</span>
          </div>

          {book.ratings_average && (
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 mr-2 flex-shrink-0 fill-yellow-400 text-yellow-400" />
              <span>{book.ratings_average.toFixed(1)} ({book.ratings_count || 0} ratings)</span>
            </div>
          )}

          {getSubjects(book) && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Subjects:</span> {getSubjects(book)}
            </div>
          )}
        </div>

        {/* First Sentence Preview */}
        {getFirstSentence(book) && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 italic line-clamp-3">
              "{getFirstSentence(book)}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <a
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center space-x-1"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Details</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BookCard
