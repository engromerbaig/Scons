import FormWindow from '../../FormWindow/FormWindow';
import CustomButton from '../../CustomButton/CustomButton';

const Step2 = ({ formData, setFormData, handleNext, handleBack }) => {
    const handleOptionSelect = (option) => {
        const updatedFormData = { ...formData, budget: option };
        setFormData(updatedFormData); // Update budget in formData
        // console.log("STEP 2 :Collected Data (Flow 1: Root to Step 2):", updatedFormData); // Log updated data
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <FormWindow
            question="Every penny you spend is a safe investment. Don’t hesitate, more is better than less!"
            spanQuestion='Don’t hesitate, more is better than less!'
            currentStep={3}
            totalSteps={5} // Adjust based on the flow
            handleBack={handleBack}
            handleNext={handleNext}
            alignRHS="end"
            showNext={false}
        >
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {['USD 1-10k', 'USD 10-25k', 'USD 25-50k', 'Not Sure'].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.budget === option}
                        onClick={() => handleOptionSelect(option)} // Update budget and move to next step
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default Step2;
