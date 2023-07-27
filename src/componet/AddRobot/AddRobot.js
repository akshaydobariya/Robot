import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addRobotValidationSchema } from "../../validation/validation";
import {
  addRobotApi,
  clearAddRobotdata,
  clearUpdateRobotdData,
  updateRobot,
} from "../../State/features/RobotSlice";
import Swal from "sweetalert2";
import Login from "../login/Login";

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
    navigate("/list"); // Redirect to the previous page
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
          <h1 className="text-2xl mb-6 font-mono font-bold">
            {selectedRobotId ? "Update" : "Add"} Robot Details
          </h1>

          {/* Robot Name */}
          <div className="mb-4">
            <label
              htmlFor="robotName"
              className="block mb-2 text-base font-bold"
            >
              Robot Name
            </label>
            <input
              type="text"
              id="robotName"
              name="robotName"
              value={values.robotName}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Robot Name"
            />
            <div className="text-black">
              {errors.robotName && touched.robotName && (
                <p className="text-sm text-red-600">{errors.robotName}</p>
              )}
            </div>
          </div>

          {/* Owner Name */}
          <div className="mb-4">
            <label
              htmlFor="ownerName"
              className="block mb-2 text-base font-bold"
            >
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={values.ownerName}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Owner Name"
            />
            <div className="text-black">
              {errors.ownerName && touched.ownerName && (
                <p className="text-sm text-red-600 ">{errors.ownerName}</p>
              )}
            </div>
          </div>

          {/* Robot Feature */}
          <div className="mb-4">
            <label
              htmlFor="robotFeature"
              className="block mb-2 text-base font-bold"
            >
              Robot Feature
            </label>
            <textarea
              id="robotFeature"
              name="robotFeature"
              value={values.robotFeature}
              onBlur={handleBlur}
              onChange={handleChange}
              rows="3"
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Robot Feature"
            ></textarea>
            <div className="text-black">
              {errors.robotFeature && touched.robotFeature && (
                <p className="text-sm text-red-600 ">{errors.robotFeature}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block mb-2 text-base font-bold"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={values.location}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Location"
            />
            <div className="text-black">
              {errors.location && touched.location && (
                <p className="text-sm text-red-600 ">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Version */}
          <div className="mb-4">
            <label htmlFor="version" className="block mb-2 text-base font-bold">
              Version
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={values.version}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
              placeholder="Enter Version"
            />
            <div className="text-black">
              {errors.version && touched.version && (
                <p className="text-sm text-red-600 ">{errors.version}</p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block mb-2 text-base font-bold" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-transparent border-b-2 border-white border-2 focus:outline-none"
            />
            <div className="text-black">
              {errors.image && touched.image && (
                <p className="text-sm text-red-600 ">{errors.image}</p>
              )}
            </div>
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
