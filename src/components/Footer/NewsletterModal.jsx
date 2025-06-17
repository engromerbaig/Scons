import React, { useState } from 'react';

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData();
    formData.append('form-name', 'newsletter');
    formData.append('email', email);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>

        {/* Hidden Netlify form trigger */}
        <form name="newsletter" netlify hidden>
          <input type="email" name="email" />
        </form>

        {status === 'success' ? (
          <p className="text-green-600">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} data-netlify="true" name="newsletter">
            {/* Required hidden input */}
            <input type="hidden" name="form-name" value="newsletter" />

            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button type="button" className="text-gray-600" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="bg-neon text-black font-semibold px-4 py-2 rounded"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Submitting...' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-600 mt-2">Submission failed. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
