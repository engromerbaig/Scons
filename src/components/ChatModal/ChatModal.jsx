// components/ChatModal/ChatModal.jsx
import React from 'react';

const ChatModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Chat With Us</h2>
        {/* Replace with actual form inputs later */}
        <form>
          <input type="text" placeholder="Your message..." className="w-full border px-3 py-2 rounded mb-4" />
          <button type="submit" className="bg-neon text-black px-4 py-2 rounded font-bold">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
