import { useState } from "react";

const FormValidation = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [error, setError] = useState({});

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const validateForm = () => {
    
    let newErrors = {};

    //First Name
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }

    //Last Name
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    //Phone Number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter valid phone number";
    }

    //Email
    if (!formData.email) {
      newErrors.email = "Enter your email Id";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter valid Email";
    }

    //Password
    if (!formData.password) {
      newErrors.password = "Please enter your password";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Please enter valid password";
    }

    //Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

    //Age
    if (!formData.age) {
      newErrors.age = "Please enter your age";
    } else if (!isValidAge(formData.age)) {
      newErrors.age =
        "Age must be greater than 18 years and less than 100 years";
    }

    //Gender
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    //Interest
    if (formData.interests.length === 0) {
      newErrors.interests = "Please select atleast one interest";
    }

    //Date of Birth
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setError(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <div className="form">

      <h1>Form Validation</h1>
    
      <form onSubmit={handleSubmit}>

        <div className="input">
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
        <div className="error">{error.firstName}</div>

        <div className="input">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <div className="error">{error.lastName}</div>

        <div className="input">
          <label>Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="error">{error.phoneNumber}</div>

        <div className="input">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email Id"
          />
        </div>
        <div className="error">{error.email}</div>

        <div className="input">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="error">{error.password}</div>

        <div className="input">
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>
        <div className="error">{error.confirmPassword}</div>

        <div className="input">
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>
        <div className="error">{error.age}</div>

        <div className="input">
          <label>Gender: </label>
          <select
            className="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="error">{error.gender}</div>

        <div className="input">
          <label>Interests: </label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleCheckBox}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interests.includes("sports")}
              onChange={handleCheckBox}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interests.includes("reading")}
              onChange={handleCheckBox}
            />
            Reading
          </label>
        </div>
        <div className="error">{error.interests}</div>

        <div className="input">
          <label>Date of Birth: </label>
          <input
            className="dob"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="Enter your Date of Birth"
          />
        </div>
        <div className="error">{error.birthDate}</div>

        <div className="btn">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormValidation;
