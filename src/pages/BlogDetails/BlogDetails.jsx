import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogs from '../../data/blogs';
import { slugify } from '../../utilities/slugify';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import InnerHero from '../../components/InnerHero/InnerHero';
import { theme } from '../../theme';

const BlogDetails = () => {
  const { blogSlug } = useParams();
  const blog = blogs.find(b => slugify(b.title) === blogSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading text="Blog not found" size="text-28px" centered={true} />
      </div>
    );
  }

  const renderElement = (Component, key, props) => (
    Component ? <Component key={key} {...props} className="mb-4" /> : null
  );

  const renderListItems = (items, listType = 'numbered') => {
    if (!items || items.length === 0) return null;

    const ListComponent = listType === 'numbered' ? 'ol' : 'ul';
    const listStyleClass = listType === 'numbered' 
      ? 'list-decimal ml-8 text-28px text-black font-semibold'
      : 'list-disc ml-8 text-28px';

    return (
      <ListComponent className={`${listStyleClass} space-y-4`}>
        {items.map((item, index) => (
          <li key={`item-${index}`} className="pl-2">
            {item.title ? (
              <span className="inline-flex items-baseline flex-wrap">
                <BodyText 
                  text={item.title}
                  color='text-black'
                  size="text-28px"
                  centered={false}
                  lineHeight="leading-loose"
                  fontWeight={listType === 'numbered' ? 'font-semibold' : 'font-bold'}
                  className="inline"
                />
                <span className="px-2">:</span>
                {listType === 'bullets' && (
                  <BodyText 
                    text={item.description} 
                    size="text-28px"
                    centered={false} 
                    lineHeight="leading-loose"
                    fontWeight="font-normal"
                    className="inline"
                  />
                )}
              </span>
            ) : (
              <BodyText 
                text={item.description} 
                size="text-28px"
                centered={false} 
                lineHeight="leading-loose"
              />
            )}
            {listType === 'numbered' && item.title && (
              <BodyText 
                text={item.description} 
                size="text-28px"
                centered={false} 
                lineHeight="leading-loose"
                className="mt-1"
              />
            )}
          </li>
        ))}
      </ListComponent>
    );
  };

  const renderContentSection = (section, index) => (
    <div key={index} className="mb-12">
      {renderElement(Heading, `heading-${index}`, {
        text: section.subheading,
        size: "text-50px",
        fontWeight: "font-medium",
        centered: false
      })}

      {section.description && renderElement(BodyText, `desc-${index}`, {
        text: section.description,
        size: "text-28px",
        centered: false,
        lineHeight: "leading-loose"
      })}

      {section.numberedPoints && renderListItems(section.numberedPoints, 'numbered')}
      {section.bulletPoints && renderListItems(section.bulletPoints, 'bullets')}

      {section.hasImages && blog.image2 && blog.image3 && (
        <div key={`images-${index}`} className="grid lg:grid-cols-2 gap-6 mb-4 mt-6">
          {[blog.image2, blog.image3].map((src, imgIndex) => (
            <img
              key={imgIndex}
              src={src}
              alt={`${section.subheading} - ${imgIndex + 1}`}
              className="w-full h-96 rounded-xl object-cover shadow-md"
            />
          ))}
        </div>
      )}

      {section.description2 && renderElement(BodyText, `desc2-${index}`, {
        text: section.description2,
        size: "text-28px",
        centered: false,
        lineHeight: "leading-loose"
      })}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <InnerHero
        headingText={blog.title}
        spanText={blog.spanTitle}
        headingSize="text-90px"
        breakSpan1={true}
        bottomShadow={false}
      />

      <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingBottom}`}>
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-[32rem] rounded-b-xl object-cover mb-6 shadow-xl"
        />

        <BodyText text={blog.date} size="text-35px" centered={false} className="mb-6" />

        <div className="prose max-w-none">
          {blog.content.map(renderContentSection)}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
