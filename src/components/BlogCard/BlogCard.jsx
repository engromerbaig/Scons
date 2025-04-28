import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { Link } from "react-router-dom";
import { slugify } from "../../utilities/slugify";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const blogUrl = `/blogs/${slugify(blog.title)}`;
  const previewText = blog.content[0].description.substring(0, 100) + "...";

  return (
    <div
      className="flex flex-col h-full max-w-2xl overflow-hidden transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(blogUrl)}
    >
      {/* Image with fixed aspect ratio */}
      <div className="w-full h-96 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>

      {/* Content section that grows to fill space */}
      <div className="flex flex-col flex-grow py-6">
        <BodyText text={blog.date} size="text-35px" centered={false} className="mb-2" />

        <Heading
          text={blog.title}
          size="text-50px"
          fontWeight="font-medium"
          centered={false}
          className="mb-4 line-clamp-2"
        />

        <BodyText
          text={previewText}
          size="text-28px"
          centered={false}
          lineHeight="leading-loose"
          className="mb-6 line-clamp-3"
        />

        {/* Keep "Read More" Link as it is */}
        <div className="mt-auto">
          <Link
            to={blogUrl}
            className="text-35px text-blue uppercase font-semibold hover:underline inline-block"
            onClick={(e) => e.stopPropagation()} // Prevents card click from triggering navigation
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
