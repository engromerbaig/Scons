import React, { useRef } from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import termsData from './termsData';
import { theme } from '../../theme';

const TermsAndConditions = () => {
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to parse markdown-like text into JSX
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];

    // Helper to parse bold markdown into JSX
    const parseInlineBold = (str) => {
      const parts = [];
      let lastIndex = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      let key = 0;

      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          parts.push(str.substring(lastIndex, match.index));
        }
        parts.push(<strong key={key++} className="font-semibold">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < str.length) {
        parts.push(str.substring(lastIndex));
      }
      return parts.length ? parts : str;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('- ')) {
        // It's a list item, collect it
        listItems.push(parseInlineBold(trimmed.slice(2).trim()));
      } else {
        // If we were collecting list items, flush them as <ul>
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc pl-6 mb-4">
              {listItems.map((item, i) => (
                <li key={`li-${idx}-${i}`} className="mb-2 text-25px">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
        }
        // For normal paragraphs, render as <p>
        if (trimmed.length > 0) {
          elements.push(
            <p key={`p-${idx}`} className="mb-4 text-25px">
              {parseInlineBold(trimmed)}
            </p>
          );
        }
      }
    });

    // Flush any remaining list items at end
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-end`} className="list-disc pl-6 mb-4">
          {listItems.map((item, i) => (
            <li key={`li-end-${i}`} className="mb-2 text-25px">{item}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="grid grid-cols-12 gap-8">
        {/* Left Content (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 max-w-xl">
          <Heading
            text={termsData.title}
            centered={false}
            isAnimate={false}
            className="mb-8"
          />
          
          {termsData.description.map((paragraph, index) => (
            <BodyText
              key={index}
              text={paragraph}
              centered={false}
              className="mb-6 leading-relaxed"
              isAnimate={false}
            />
          ))}

          <div className="mt-10">
            {termsData.termsList.map((term, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="mb-12 scroll-mt-24"
              >
                <Heading
                  text={term.title}
                  size="text-2xl"
                  fontWeight="font-semibold"
                  isAnimate={false}
                  centered={false}
                  className="text-left mb-4"
                />
                <div className="leading-relaxed text-base">
                  {parseMarkdown(term.text)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <ul className="space-y-2">
              {termsData.termsList.map((term, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className="w-full text-left text-black text-sm hover:text-neon hover:bg-gray-50 px-4 py-2 rounded-full transition-colors duration-200 font-medium"
                  >
                    {term.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;