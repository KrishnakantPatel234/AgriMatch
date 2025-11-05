const EmptyState = ({ type }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">
      {type === 'farmers' && '🌾'}
      {type === 'transport' && '🚚'}
      {type === 'cold storage' && '❄️'}
      {type === 'buyers' && '👨‍💼'}
    </div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">No {type} found</h3>
    <p className="text-gray-500">Try adjusting your search criteria or check back later</p>
  </div>
);

export default EmptyState;