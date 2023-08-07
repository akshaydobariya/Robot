import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addRobotValidationSchema } from "../../validation/validation";
import {
  clearAddRobotdata,
  clearUpdateRobotdData,
} from "../../State/features/RobotSlice";

import Swal from "sweetalert2";
import { addRobotApi, updateRobot } from "../../Apicall/api";
import LableComponent from "../../Common/LableComponent";
import InputComponrnt from "../../Common/InputComponrnt";
import TextareaComponent from "../../Common/TextareaComponent";

const AddRobot = () => {
  // Redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBlog, addRobot, updateRobotdData } = useSelector(
    (state) => state.robots
  );
  const { accessToken } = useSelector((state) => state.login);

  // State for handling file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRobotId, setSelectedRobotId] = useState(null);

  // Function to navigate to the previous page
  const handleGoBack = () => {
    navigate(-1); // Redirect to the previous page
  };

  // Form handling with Formik
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    // Initial values for the form fields
    initialValues: {
      robotName: "",
      ownerName: "",
      robotFeature: "",
      location: "",
      version: "",
      image: null,
    },
    // Validation schema for form fields
    validationSchema: addRobotValidationSchema,
    // Submit function when the form is submitted
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("RobotName", values.robotName);
      formData.append("image", selectedFile);
      formData.append("OwnerName", values.ownerName);
      formData.append("RobotFeatures", values.robotFeature);
      formData.append("Location", values.location);
      formData.append("FirmwareVersion", values.version);

      // If a robot is selected (editing mode)
      if (selectedRobotId) {
        formData.append("Id", selectedRobotId);
        dispatch(updateRobot({ formData, accessToken }));
      } else {
        console.log(values.robotName);
        // If no robot is selected (adding mode)
        dispatch(addRobotApi({ formData, accessToken }));
        if (addRobot === "Robot Added Successfully") {
          resetForm(); // Reset form on successful addition
        }
      }
    },
  });

  // UseEffect to set form values when a robot is selected (edit mode)
  useEffect(() => {
    if (selectedBlog) {
      setSelectedRobotId(selectedBlog.id); // Set the selected robot's ID when it is selected
      setSelectedFile(selectedBlog.imagePath); // Set the selected file (image) path
      setValues({
        robotName: selectedBlog.robotName,
        ownerName: selectedBlog.ownerName,
        robotFeature: selectedBlog.robotFeatures,
        location: selectedBlog.location,
        version: selectedBlog.firmwareVersion,
      });
    } else {
      setSelectedRobotId(null); // Reset the selected robot ID when no robot is selected
    }
  }, [selectedBlog, setValues]);

  // Function to handle file change for image upload
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to display success alert on successful addition/update
  const displaySuccessAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
      background: "#000", // Apply custom styles to the alert
      color: "#fff",
    });
  };

  // UseEffect to handle success alerts and clear redux data on successful addition/update
  useEffect(() => {
    if (addRobot === "Robot Added Successfully") {
      displaySuccessAlert();
      dispatch(clearAddRobotdata());
    }
    if (updateRobotdData === "Robot updated successfully") {
      displaySuccessAlert();
      dispatch(clearUpdateRobotdData());
    }
  }, [addRobot, updateRobotdData]);

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="w-full max-w-xl">
        <form className="bg-black text-white p-8" onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-6 font-mono font-bold flex items-center justify-center">
            {selectedRobotId ? "Update" : "Add"} Robot Details
          </h1>

          {/* Robot Name */}
          <div className="mb-4">
            <LableComponent name=" Robot Name" />
            <InputComponrnt
              type="text"
              id="robotName"
              name="robotName"
              value={values.robotName}
              placeholder="Enter Robot Name"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.robotName}
              touch={touched.robotName}
            />
          </div>

          {/* Owner Name */}
          <div className="mb-4">
            <LableComponent name="Owner Name" />
            <InputComponrnt
              type="text"
              id="ownerName"
              name="ownerName"
              value={values.robotName}
              placeholder="Enter Owner Name"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.ownerName}
              touch={touched.ownerName}
            />
          </div>

          {/* Robot Feature */}
          <div className="mb-4">
            <LableComponent name=" Robot Feature" />
            {/* <textarea
              id="robotFeature"
              name="robotFeature"
              value={values.robotFeature}
              onBlur={handleBlur}
              onChange={handleChange}
              rows="3"
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Robot Feature"
            ></textarea> */}
            <TextareaComponent
              id="robotFeature"
              name="robotFeature"
              value={values.robotFeature}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.ownerName}
              touch={touched.ownerName}
              placeholder="Enter Robot Feature"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <LableComponent name="Location" />
            <InputComponrnt
              type="text"
              id="location"
              name="location"
              value={values.location}
              placeholder="Enter Location"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.location}
              touch={touched.location}
            />
          </div>

          {/* Version */}
          <div className="mb-4">
            <LableComponent name="Version" />
            <InputComponrnt
              type="text"
              id="version"
              name="version"
              value={values.version}
              placeholder="Enter Version"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.version}
              touch={touched.version}
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <LableComponent name="Upload Image" />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-transparent border-b-2 border-white border-2 focus:outline-none"
            />
          </div>
          <div className="text-black">
            {errors.image && touched.image && (
              <p className="text-sm text-red-600 override-color">
                {errors.image}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-xl bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded"
          >
            {selectedRobotId ? "Update" : "Add"}
          </button>

          <button
            className="ml-6 text-xl bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoBack}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRobot;
