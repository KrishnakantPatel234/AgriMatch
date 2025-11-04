// components/Reviews.js
import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Ramesh Kumar',
      role: 'Farmer',
      location: 'Punjab',
      rating: 5,
      comment: 'AgriMatch helped me get 30% better prices for my wheat. Direct connection with buyers changed my life!',
      avatar: '👨‍🌾'
    },
    {
      name: 'Anita Desai',
      role: 'Business Owner',
      location: 'Delhi',
      rating: 5,
      comment: 'As a grocery chain owner, finding reliable organic farmers was tough. AgriMatch made it seamless!',
      avatar: '👩‍💼'
    },
    {
      name: 'Vikram Singh',
      role: 'Transport Provider',
      location: 'Maharashtra',
      rating: 4,
      comment: 'Great platform to connect with farmers needing transport services. Business has grown significantly.',
      avatar: '👨‍✈️'
    },
    {
      name: 'Priya Reddy',
      role: 'Cold Storage Owner',
      location: 'Karnataka',
      rating: 5,
      comment: 'Efficient matching with farmers who need storage. Platform is very user-friendly and reliable.',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-green-600">Users Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from farmers, buyers, and service providers who have transformed their agricultural business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{review.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  <p className="text-green-600 text-sm">{review.role}</p>
                  <p className="text-gray-500 text-xs">{review.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              
              <p className="text-gray-600 italic leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;