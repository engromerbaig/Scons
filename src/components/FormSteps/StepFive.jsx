import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import CustomButton from '../CustomButton/CustomButton';

const StepFive = () => {
    const navigate = useNavigate();

    return (
        <FormWindow
            question="Thank you for your application!"
            spanQuestion="your application!"
            bodyQuestion='We appreciate your interest in joining Scons Tech. Our hiring team will review your application and get back to you soon.'
            showNext={false}
            showBack={false}
            alignRHS="end"
        >
            {/* RHS Container */}
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {/* Back to Website Button */}
                <CustomButton
                    option="Return to Website"
                    isSelected={false}
                    onClick={() => navigate('/')}
                />
            </div>
        </FormWindow>
    );
};

export default StepFive;
