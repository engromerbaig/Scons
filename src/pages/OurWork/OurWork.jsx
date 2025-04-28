import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import InnerHero from "../../components/InnerHero/InnerHero";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import porftolioImage1 from '../../assets/images/portfolio1.png';
import porftolioImage2 from '../../assets/images/portfolio2.png';

const OurWork = () => {
    const data = [
        { id: 1, text: "Health Mobile App", image: porftolioImage1, position: "left", link: "#" },
        { id: 2, text: "Car Website", image: porftolioImage2, position: "right", link: "#" },
        { id: 3, text: "Clothing Website", image: porftolioImage1, position: "left", link: "#" },
        { id: 4, text: "Gaming Application", image: porftolioImage1, position: "right", link: "#" },
        { id: 5, text: "E-Commerce ", image: porftolioImage2, position: "left", link: "#" },
        { id: 6, text: "Travel Booking App", image: porftolioImage1, position: "right", link: "#" }
    ];

    return (
        <div >
            <InnerHero
                headingText="Our Portfolio"
                spanText="Portfolio"
                bodyText="A showcase of diverse projects that highlight our expertise in creating impactful, innovative tech solutions across industries."
            />
            <ImageGrid data={data} /> {/* Pass the data prop */}
        </div>
    );
};

export default OurWork;
