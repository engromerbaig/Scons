import { theme } from "../../theme";

const GreenBelt = ({ children, className }) => {
    return (
        <div className={`py-4 md:py-8 text-black bg-blue ${theme.layoutPages.paddingHorizontal} ${className}`}>
            {children}
        </div>
    );
};

export default GreenBelt;