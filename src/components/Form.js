import React, { useState } from "react";
import { COURSE_LIST, JSON_FEE, LEVEL_LIST } from "../constants/Constants";
import Alertmodal from "../modals/Alertmodal";

const Form = () => {
    const [feeType, setFeeType] = useState("");
    const [nationality, setNationality] = useState("");
    const [course, setCourse] = useState("");
    const [level, setLevel] = useState("");
    const [amount, setAmount] = useState(null);

    const handleFeeTypeChange = (e) => {
        setFeeType(e.target.value);
        setNationality("");
        setCourse("");
        setLevel("");
        setAmount(null);
    };

    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
        setCourse("");
        setLevel("");
        setAmount(null);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
        setLevel("");
        setAmount(null);
    };

    const handleLevelChange = (e) => {
        const selectedLevel = e.target.value;
        setLevel(selectedLevel);

        // Fee retrieval logic
        const data = JSON_FEE[feeType]?.[nationality];
        if (!data) return;

        const courseKey = Object.keys(data).includes(course)
            ? course
            : "ALL_COURSES";

        const levelKey = Object.keys(data[courseKey] || {}).includes(selectedLevel)
            ? selectedLevel
            : "ALL_LEVEL";

        const feeAmount = data[courseKey]?.[levelKey]?.amount;
        setAmount(feeAmount || "Not Available");
    };

    const getNationalities = () => {
        return Object.keys(JSON_FEE[feeType] || {});
    };

    const getCourses = () => {
        return COURSE_LIST;
    };

    const getLevels = () => {
        return LEVEL_LIST;
    };

    return (
        <div className="wrapper m-5 w-50">
            <h2 className="text-primary text-center">JSON Fees Info - React JS</h2>
            <form>
                <div class="mb-3">
                    <label>Fee Type: </label>
                    <select class="form-select" value={feeType} onChange={handleFeeTypeChange}>
                        <option value="">Select Fee Type</option>
                        {Object.keys(JSON_FEE).map((feetype) => (
                            <option key={feetype} value={feetype}>{feetype}</option>
                        ))}
                    </select>
                </div>

                {feeType && (
                    <div class="mb-3">
                        <label>Nationality: </label>
                        <select class="form-select" value={nationality} onChange={handleNationalityChange}>
                            <option value="">Select Nationality</option>
                            {getNationalities().map((nattype) => (
                                <option key={nattype} value={nattype}>{nattype}</option>
                            ))}
                        </select>
                    </div>
                )}

                {nationality && (
                    <div class="mb-3">
                        <label>Course: </label>
                        <select class="form-select" value={course} onChange={handleCourseChange}>
                            <option value="">Select Course</option>
                            {getCourses().map((crstype) => (
                                <option key={crstype} value={crstype}>{crstype}</option>
                            ))}
                        </select>
                    </div>
                )}

                {course && (
                    <div class="mb-3">
                        <label>Level: </label>
                        <select class="form-select" value={level} onChange={handleLevelChange}>
                            <option value="">Select Level</option>
                            {getLevels().map((lvltype) => (
                                <option key={lvltype} value={lvltype}>{lvltype}</option>
                            ))}
                        </select>
                    </div>
                )}

                {amount !== null && (
                    <Alertmodal fees={amount} />
                )}
            </form>
        </div>
    );
};

export default Form;