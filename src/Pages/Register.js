import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import Dropdown from "../Components/Material/Dropdown";
import { useLayoutEffect } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "../Components/Material/Loader";
import localinstance from "../localinstance";
import Swal from "sweetalert2";
import Loader2 from "../Components/Material/Loader2";
import { useFormik } from "formik";

// const useStyle = makeStyles({
//   textClass: {
//     "& .MuiOutlinedInput-input": {
//       "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//         "-webkit-appearance": "none",
//         margin: 0,
//       },
//     },
//     width: "410px",
//     // backgroundColor: "#F3F1F5",
//   },
//   DropDownClass: {
//     width: "200px",
//   },
// });

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [grades, setGrades] = useState([]);

  useLayoutEffect(() => {
    GetGrades();
  }, []);

  // Swal.fire("Good job!", "You clicked the button!", "error").then((result) => {
  //   if (result.isConfirmed) {
  //     // window.location.reload();
  //   }
  // });

  const formik = useFormik({
    initialValues: {
      schoolCode: "",
      fullName: "",
      userName: "",
      email: "",
      grade: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};
      const RegexEmail =
        /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

      if (!RegexEmail.test(values.email)) {
        errors.email = "Invalid Email";
      }

      if (values.userName.length < 6) {
        errors.userName = "UserName must be greater than 5";
      }
      if (values.email.length === 0) {
        errors.email = "Email is required";
      }
      if (values.schoolCode.length === 0) {
        errors.schoolCode = "School Code is required";
      }
      if (values.grade.length === 0) {
        errors.grade = "Grade is required";
      }
      if (values.fullName.length === 0) {
        errors.fullName = "Full Name is required";
      }
      if (values.userName.length === 0) {
        errors.userName = "User Name is required";
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password and Confirm Password must be same";
      }

      if (values.password.length < 6) {
        errors.password = "Password must be greater than 5";
      }

      if (values.password.length === 0) {
        errors.password = "Password is required";
      }
      if (values.confirmPassword.length === 0) {
        errors.confirmPassword = "Confirm Password is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await localinstance({
        url: `auth/signUp`,
        method: "POST",
        data: {
          schoolCode: values.schoolCode,
          fullName: values.fullName,
          userName: values.userName,
          email: values.email,
          password: values.password,
          grade: values.grade,
        },
      }).catch((err) => {
        if (err?.response?.data?.msg === "School Code is not valid") {
          formik.errors.schoolCode = "School Code is not valid";
        }
        if (err?.response?.data?.msg === "user already exists") {
          Swal.fire(
            "User already exists",
            "try with another email and username",
            "error"
          );
        }
        setLoading(false);
      });
      if (res.status === 200 && res.data.success) {
        Swal.fire("User created successfully", "success").then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      setLoading(false);
    },
  });

  const GetGrades = async () => {
    const res = await localinstance({
      url: `grade`,
      method: "GET",
    });
    setGrades(res.data.message);
  };

  const handleSignUp = (value, name) => {
    if (name === "select_grade") {
      formik.values.grade = value.id;
    }
  };

  return (
    <div>
      <form
        className="flex  flex-col    px-5  rounded-lg  w-full"
        style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
      >
        <Loader2 loading={loading} />
        <div className="formGroup flex-col flex   ">
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh] mt-2">
            <label htmlFor="" className=" text-md font-bold ">
              School Code
            </label>
            <TextField
              type="text"
              size="small"
              className=" border rounded-lg shadow-md w-[97%]"
              helperText={formik.errors.schoolCode}
              error={formik.errors.schoolCode}
              onChange={(e) => {
                formik.values.schoolCode = e.target.value;
              }}
              // error={schoolErr || SchoolNameErr()}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Full Name
            </label>
            <TextField
              type="text"
              size="small"
              className=" border rounded-lg shadow-md w-[97%]"
              helperText={formik.errors.fullName}
              error={formik.errors.fullName}
              onChange={(e) => {
                formik.values.fullName = e.target.value;
              }}
              // error={EmailErr || emailError()}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Username
            </label>
            <TextField
              type="text"
              size="small"
              helperText={formik.errors.userName}
              error={formik.errors.userName}
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => {
                formik.values.userName = e.target.value;
              }}
              // error={EmailErr || emailError()}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Email
            </label>
            <TextField
              type="email"
              size="small"
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => {
                formik.values.email = e.target.value;
              }}
              helperText={formik.errors.email}
              error={formik.errors.email}
              // error={EmailErr || emailError()}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Grade
            </label>
            <Dropdown
              error={formik.errors.grade}
              helperText={formik.errors.grade}
              handleOrderProcessingForm={handleSignUp}
              Name={"select_grade"}
              data={grades}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Enter Password
            </label>
            <TextField
              type="password"
              size="small"
              helperText={formik.errors.password}
              error={formik.errors.password}
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => {
                formik.values.password = e.target.value;
              }}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Confirm Password
            </label>
            <TextField
              type="password"
              helperText={formik.errors.confirmPassword}
              error={formik.errors.confirmPassword}
              size="small"
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => {
                formik.values.confirmPassword = e.target.value;
              }}
            />
          </div>

          <div className="flex flex-col !justify-start !items-start mb-[1vh] ">
            <Button
              type="reset"
              className=" w-[97%] shadow-xl rounded-xl "
              variant="contained"
              sx={{ padding: "10px" }}
              onClick={formik.handleSubmit}
            >
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <div>Register</div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
