import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import localinstance from "../localinstance";
import { useState } from "react";
import Loader from "../Components/Material/Loader";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const params = useSearchParams();
  useEffect(() => {
    setId(params[0].get("id"));
    setToken(params[0].get("token"));
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

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
        url: `auth/reset_password`,
        method: "POST",
        data: {
          token,
          userId: id,
          password: values.password,
        },
      }).catch((err) => {
        console.log(err.response);

        if (err?.response?.data?.msg === "Invalid token") {
          Swal.fire("Error", "Invalid or Expired token", "error");
        }

        setLoading(false);
      });

      if (res.status === 200 && res.data.success) {
        Swal.fire("Success", "Your password has been changed", "success");
        navigate("/");
      }

      setLoading(false);
    },
  });

  return (
    <div className="w-full h-screen flex justify-center">
      <form className="flex flex-col gap-2 mt-[10vh]">
        <label htmlFor="" className="text-lg font-semibold">
          Enter Password
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
        <label htmlFor="" className="text-lg font-semibold">
          Confirm Password
        </label>
        <TextField
          type="text"
          size="small"
          className=" border rounded-lg shadow-md w-full"
          onChange={(e) => {
            formik.values.confirmPassword = e.target.value;
          }}
          error={formik.errors.confirmPassword}
          helperText={formik.errors.confirmPassword}
        />
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
            <div>Reset Password</div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
