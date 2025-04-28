import React, { useState } from 'react';
import RootOption from '../../components/InnovateSteps/RootOption';
import ProjectSteps from '../../components/InnovateSteps/Project/ProjectSteps';
import TeamSteps from '../../components/InnovateSteps/Team/TeamSteps';
import QuickWordSteps from '../../components/InnovateSteps/QuickWord/QuickWordSteps';
import FinalStep from '../../components/InnovateSteps/FinalStep';
import { theme } from '../../theme';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';

const LetsInnovate = () => {
    const [step, setStep] = useState(1);
    const [flow, setFlow] = useState(''); // Track the selected flow
    const [formData, setFormData] = useState({
        // source: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        description: '',
        lead_type: '',
        // additionalDetails: '',
        // Budget:'',
         // General additional field
    });

    // Define total steps for each flow dynamically
    const flowSteps = {
        'Start a project': 5,
        'Build a Smart Team': 7,
        'Drop a quick word': 3,
        // Book a Discovery Call has no steps
    };

    const totalSteps = flowSteps[flow] || 1; // Default to 1 if no flow is selected

    const handleFlowSelection = (option) => {
        if (option === 'Book a Discovery Call') {
            window.open('https://calendly.com/tyfora/30min', '_blank'); // Open Calendly in a new tab
        } else {
            setFlow(option); // Set the selected flow
            setStep(2); // Start the flow-specific steps
        }
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <AnimatedBackground isInner className={`h-screen ${theme.layoutPages.paddingHorizontal}   overflow-hidden`}>
            <div className="w-full h-full flex">
                {/* Root Step */}
                {step === 1 && (
                    <RootOption
                        formData={formData}
                        setFormData={setFormData}
                        handleFlowSelection={handleFlowSelection}
                        currentStep={step}
                    />
                )}

                {/* Flow-specific step managers */}
                {flow === 'Start a project' && step < totalSteps && (
                    <ProjectSteps
                        formData={formData}
                        setFormData={setFormData}
                        currentStep={step}
                        setStep={setStep}
                    />
                )}

                {flow === 'Build a Smart Team' && step < totalSteps && (
                    <TeamSteps
                        formData={formData}
                        setFormData={setFormData}
                        currentStep={step}
                        setStep={setStep}
                    />
                )}

                {flow === 'Drop a quick word' && step < totalSteps && (
                    <QuickWordSteps
                        formData={formData}
                        setFormData={setFormData}
                        currentStep={step}
                        setStep={setStep}
                    />
                )}

                {/* Dynamic Final Step */}
                {step > 1 && step === totalSteps && (
                    <FinalStep
                        formData={formData}
                        handleBack={handleBack}
                    />
                )}
            </div>
        </AnimatedBackground>
    );
};

export default LetsInnovate;
