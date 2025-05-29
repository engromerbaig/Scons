import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import jobListings from '../../data/jobListings.json'; // Updated import
import bulletIcon from '../../assets/icons/bullet.svg';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import GreenBelt from '../../components/GreenBelt/GreenBelt';
import InnerHero from '../../components/InnerHero/InnerHero';
import BlogCard from '../../components/BlogCard/BlogCard';
import BlogPagination from '../../components/BlogPagination/BlogPagination';
// import { slugify } from '../../utilities/slugify';
// import importJobImages from '../../utilities/importJobImages';



const Blogs = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Ensures it stays at the top on first mount
    }, []);
    return (    <div className="flex flex-col items-center ">
        {/* InnerHero Section */}
        <InnerHero
            headingText="Blogs & Insights"
            spanText="Insights" // Dynamically generated spanText
            bodyText="Stay ahead with the latest insights, trends, and innovations. Explore expert opinions, industry updates, and fresh perspectives—all in one place!"
   
        />

        <BlogPagination />


    </div>  );
}
 
export default Blogs;