 const calculateReadingTime = (body) => {
  const wordsPerMinute = 200;
  if (!body || !Array.isArray(body)) return 0;
  const text = body
    .filter(block => block._type === 'block' && block.children)
    .map(block => block.children.map(c => c.text).join(' '))
    .join(' ');
  const words = text.split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute);
};

export default calculateReadingTime;