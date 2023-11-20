import React from "react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import eupheus from "../Components/assest/eupheus.png";
import { TextField } from "@mui/material";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import Loader from "../Components/Material/Loader";
import Swal from "sweetalert2";
import { useFormik } from "formik";

const LoginPage = ({ setIndex }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameEmail: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      const RegexEmail =
        /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

      // if (
      //   !RegexEmail.test(values.usernameEmail) &&
      //   values.usernameEmail.includes("@")
      // ) {
      //   errors.usernameEmail = "Invalid Email";
      // }

      if (
        values.usernameEmail.length < 6 &&
        !RegexEmail.test(values.usernameEmail)
      ) {
        errors.usernameEmail = "UserName must be greater than 5";
      }

      if (!values.usernameEmail) {
        errors.usernameEmail = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await localinstance({
        url: `auth/login`,
        method: "POST",
        data: {
          userName: values.usernameEmail,
          password: values.password,
        },
      }).catch((err) => {
        if (err?.response?.data?.msg === "User not found") {
          formik.errors.usernameEmail = "Username or Email not found";
        }
        if (err?.response?.data?.msg === "Invalid password") {
          formik.errors.password = "Invalid password";
        }

        setLoading(false);
      });
      if (res.status === 200 && res.data.success) {
        Cookies.set("token", res.data.token);
        navigate("/home");
      }
      setLoading(false);
    },
  });

  return (
    <div>
      <form
        className="flex  flex-col   p-5  rounded-lg  "
        style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
      >
        <div className="formGroup flex-col flex">
          <div className="flex flex-col !justify-start !items-start mb-[4vh]">
            <label htmlFor="" className=" text-lg font-semibold mb-[2vh]">
              Username or Email
            </label>
            <TextField
              type="text"
              size="small"
              className=" border rounded-lg shadow-md w-full"
              onChange={(e) => {
                formik.values.usernameEmail = e.target.value;
              }}
              error={formik.errors.usernameEmail}
              helperText={formik.errors.usernameEmail}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-[4vh]">
            <label htmlFor="" className=" text-lg font-semibold mb-[2vh]">
              Password
            </label>
            <TextField
              type="text"
              size="small"
              className=" border rounded-lg shadow-md w-full"
              onChange={(e) => {
                formik.values.password = e.target.value;
              }}
              error={formik.errors.password}
              helperText={formik.errors.password}
            />
          </div>

          <div className="flex flex-col !justify-start !items-start mb-[3vh]">
            <Button
              type="reset"
              className=" w-full shadow-xl rounded-xl "
              variant="contained"
              sx={{ padding: "10px" }}
              onClick={formik.handleSubmit}
            >
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <div>Login</div>
              )}
            </Button>
            <div className="w-full flex justify-between">
              <p>
                Not a user?{" "}
                <span
                  onClick={() => setIndex(1)}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Register Now
                </span>
              </p>
              <span
                onClick={() => {
                  navigate("/reset_password");
                }}
                className="text-blue-400 underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
