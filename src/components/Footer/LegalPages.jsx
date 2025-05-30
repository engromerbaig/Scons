import { Link } from "react-router-dom";

const LegalPages = ({ onClick }) => {
    return ( 
        <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="neon-hover" onClick={onClick}>
                Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms-and-conditions" className="neon-hover" onClick={onClick}>
                Terms &amp; Conditions
            </Link>
        </div>
    );
};

export default LegalPages;
