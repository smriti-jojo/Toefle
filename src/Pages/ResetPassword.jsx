import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import localinstance from "../localinstance";
import { useState } from "react";
import Loader from "../Components/Material/Loader";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const formik = useFormik({
    initialValues: {
      usernameEmail: "",
    },
    validate: (values) => {
      const errors = {};
      const RegexEmail =
        /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

      if (
        values.usernameEmail.length < 6 &&
        !RegexEmail.test(values.usernameEmail)
      ) {
        errors.usernameEmail = "UserName must be greater than 5";
      }

      if (!values.usernameEmail) {
        errors.usernameEmail = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await localinstance({
        url: `auth/request_reset_password`,
        method: "POST",
        data: {
          userNameEmail: values.usernameEmail,
        },
      }).catch((err) => {
        console.log(err.response);
        if (err?.response?.data?.msg === "User not found") {
          formik.errors.usernameEmail = "Username or Email not found";
        }
        if (err?.response?.data?.msg === "Could not send email") {
          Swal.fire("Error", "Could not send email", "error");
        }

        setLoading(false);
      });

      if (res.status === 200 && res.data.success) {
        Swal.fire("Success", "Password Reset Email sent", "success");
        setSended(true);
      }

      setLoading(false);
    },
  });

  return (
    <div className="w-full h-screen flex justify-center">
      <form className="flex flex-col gap-2 mt-[10vh]">
        <label htmlFor="" className="text-lg font-semibold">
          Enter Username or email
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
            <div>{sended ? "Resend" : "Send"} password reset email</div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
