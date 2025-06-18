import React, { useState, useEffect } from 'react';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import { CheckCircle, XCircle } from 'lucide-react';
import modalImage from "../../assets/images/news.svg";

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-close modal after success or error
  useEffect(() => {
    let timer;
    if (status === 'success' || status === 'error') {
      timer = setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [status, onClose]);

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
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-md xl:max-w-4xl shadow-2xl relative min-h-[200px] xl:min-h-[400px] 2xl:min-h-[500px] flex flex-col xl:flex-row">
        {/* Image Section (Hidden below xl, shown only in idle/loading state) */}
        {(status === 'idle' || status === 'loading') && (
          <div className="hidden xl:flex xl:w-1/2 bg-gray-100 rounded-l-xl items-center justify-center">
            <img 
              src={modalImage} 
              alt="Newsletter Illustration" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-6 xl:p-8 flex flex-col gap-2 justify-center relative xl:w-1/2">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <XCircle size={24} />
          </button>

          {status !== 'success' && status !== 'error' && (
            <Heading 
              text="Subscribe to Our Newsletter" 
              spanText='Newsletter' 
              spanFontWeight='font-black' 
              fontWeight='font-semibold' 
              size='text-30px' 
              centered={false} 
              lineHeight="leading-loose"
            />
          )}

          {/* Hidden Netlify form trigger */}
          <form name="newsletter" netlify hidden>
            <input type="email" name="email" />
          </form>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="text-green-600" size={48} />
              <p className="text-green-600 text-center">Thank you for subscribing!</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="text-red-600" size={48} />
              <p className="text-red-600 text-center">Unfortunately, we couldn't subscribe you. Please try again.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} data-netlify="true" name="newsletter" className="mt-6">
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-center">
                <Button
                  name={status === 'loading' ? 'Subscribing' : 'Subscribe'}
                  type="submit"
                  bgColor="bg-neon"
                  textColor="black"
                  hoverTextColor='black'
                  hoverBgColor="bg-neon"
                  isLoading={status === 'loading'}
                  disabled={status === 'loading'}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;