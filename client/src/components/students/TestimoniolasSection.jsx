import React from 'react';
import { dummyTestimonial, assets } from '../../assets/assets';

const TestimonialsSection = () => {
  return (
    <div className="testimonial-section">
      <style>{`
        .testimonial-section {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 2rem;
          text-align: center;
        }

        .testimonial-section h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }

        .testimonial-section p.description {
          font-size: 1.05rem;
          color: #374151;
          margin-bottom: 3rem;
        }

        .testimonial-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          text-align: left;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .testimonial-header img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-header h3 {
          font-size: 1.1rem;
          margin: 0;
          color: #111827;
        }

        .testimonial-header p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .stars {
          display: flex;
          gap: 4px;
          margin: 0.5rem 0;
        }

        .stars img {
          width: 18px;
          height: 18px;
        }

        .testimonial-feedback {
          font-size: 1rem;
          color: #374151;
          margin-top: 0.5rem;
        }
      `}</style>

      <h2>Testimonials</h2>
      <p className="description">
        Hear from learners as they share their experiences with our platform.
        Their journey of transformation and growth showcases the power of education.<br />
        Join us in celebrating their achievements and the impact of our courses on their lives.
      </p>

      <div className="testimonial-list">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <img src={testimonial.image} alt={testimonial.name} />
              <div>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.role}</p>
              </div>
            </div>

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="Star"
                />
              ))}
            </div>

            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <a href="#">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
