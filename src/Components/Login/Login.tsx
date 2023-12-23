import React, { useState } from "react";
import { useDispatch } from "react-redux";
import frame from "../../Assets/Icons/Vector (Stroke).png";
import logo from "../../Assets/Icons/Daginlogo.jpg";
import eye from "../../Assets/Icons/eye.svg";
import API from "../../Api";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import "./Login.scss";
import { handleLogin } from "../../redux/Slices/LoginSlice";
import { Loading } from "../Loading/Loading";
export const Login = () => {
  const LoginSchema = Yup.object().shape({
    // phone: Yup.number.required("required"),
    // password: Yup.string().required("required"),
  });
  const loginObject = {
    phone: "",
    password: "",
  };
  const [userPhone, setUserPhone] = useState("");
  const [loginObj, setLoginObj] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: string, field: string) => {
    if (field === "phone") {
      let obj = {
        phone: e,
      };
      setUserPhone(e);
      setLoginObj(obj);
    } else {
      let obj = {
        phone: userPhone,
        password: e,
      };
      setUserPassword(e);
      setLoginObj(obj);
    }
  };
  const handleLoginSubmit = () => {
    setIsLoading(true);
    let obj = {
      phone: userPhone,
      password: userPassword,
    };
    API.post("auth/login", obj)
      .then((response) => {
        if (response) {
          setIsLoading(false);
          console.log("Logged");
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("userName", response.data.name);
          window.location.reload();
          window.location.reload();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="Login">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 direction">
        {/* Right Section */}
        <div className="col-span-1 bg-green-950 h-screen  items-center justify-center">
          <div>
            {/* SVG Image */}
            <div
              className="relative mr-40 mt-20"
              style={{ marginBottom: "158px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="453"
                height="181"
                viewBox="0 0 453 181"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M314.793 39.7361V2.3028H135.9C101.697 2.3028 70.4422 15.112 46.8433 36.2824C43.1723 39.5917 39.6165 43.057 36.3403 46.7718L36.3346 46.7783L36.3288 46.7847C15.219 70.3625 2.30652 101.587 2.30652 135.75V178.697H450.693V2.3028H407.7C373.497 2.3028 342.241 15.1126 318.642 36.2839L314.793 39.7361ZM453 0V181H0V135.75C0 100.998 13.137 69.2325 34.6092 45.25C37.9614 41.449 41.5854 37.9195 45.3 34.571C69.309 13.032 101.11 0 135.9 0H317.1V34.571C317.861 33.8882 318.63 33.214 319.407 32.5485C343.128 12.2189 374.012 0 407.7 0H453ZM274.107 138.053H42.9935V135.75C42.9935 84.6138 84.7044 42.9472 135.9 42.9472H274.107V138.053ZM410.007 138.053H314.793V135.75C314.793 84.6138 356.504 42.9472 407.7 42.9472H410.007V138.053ZM45.329 133.447C46.5582 84.6395 86.7501 45.25 135.9 45.25H271.8V135.75H45.3C45.3 134.98 45.3097 134.213 45.329 133.447ZM317.129 133.447C318.339 85.4052 357.299 46.4882 405.393 45.279C406.16 45.2597 406.929 45.25 407.7 45.25V135.75H317.1C317.1 134.98 317.11 134.213 317.129 133.447Z"
                  fill="#F3EFA1"
                  fill-opacity="0.1"
                />
              </svg>
              {/* Text Overlay */}
              <p className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2 mt-2  text-white first-market">
                أول سوق دواجن فى
              </p>

              <p className="absolute top-28  first-letter: transform -translate-x-1/2 -translate-y-1/2 mr-16 arab-world">
                الوطن العربي
              </p>
              <span className=" absolute needs  mr-10">
                كل ما تحتاجه فى سوق الدواجن بداية من الاعلاف لدينا هنا
              </span>
            </div>
            <div className="relative">
              <img src={frame} alt="golden-frame" className="overflow-hidden" />
            </div>
          </div>
        </div>
        {/* Left Section */}
        <div className="col-span-1 rounded-md mt-10">
          <div className="logo-section">
            <img src={logo} alt="logo" className="logo" />
            <Formik
              onSubmit={() => handleLoginSubmit()}
              initialValues={loginObj}
              validationSchema={LoginSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <>
                  <form
                    className="mx-auto flex w-full max-w-lg flex-col  p-4 sm:p-16"
                    style={{ padding: "3rem" }}
                    onSubmit={handleSubmit}
                  >
                    <div className="flex w-full flex-col gap-2">
                      <p className="inline-flex items-center justify-center welcome-banner">
                        مرحباً بك في
                        <p className="overflow-hidden dagin">داچن</p>
                      </p>
                      <span className="inline-flex items-center justify-center log-to-acc">
                        تسجيل الدخول الى حسابك
                      </span>
                    </div>

                    <div className="form-group">
                      <div className="form-field">
                        <input
                          type="text"
                          placeholder="رقم الهاتف"
                          className="login-phone"
                          name="phone"
                          //onBlur={handleBlur}
                          onChange={(e) =>
                            handleChangeInput(e.target.value, "phone")
                          }
                          // value={this.state.loginObject.phone}
                          id="phone"
                        />
                      </div>
                      <div className="form-field" style={{ width: "427px" }}>
                        <input
                          type="password"
                          className="input input-lg max-w-full login-password"
                          placeholder="كلمة المرور"
                          onChange={(e) =>
                            handleChangeInput(e.target.value, "password")
                          }
                          id="password"
                        />

                        <span
                          className="relative inset-y-0  right-96 inline-flex items-center"
                          style={{ marginTop: "-40px" }}
                        >
                          <img src={eye} alt="eye-pw" />
                        </span>
                      </div>
                      <div className="form-field" style={{ marginTop: "20px" }}>
                        <div className="form-control justify-between">
                          <label className="form-label">
                            <a className="link link-underline-hover link-primary text-sm forget-pw">
                              نسيت كلمة المرور؟
                            </a>
                          </label>
                          <div
                            className="flex gap-2"
                            style={{ marginRight: "20px" }}
                          >
                            <a href="#">تذكرني</a>
                            <input
                              type="checkbox"
                              className="checkbox-success checkbox rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-field pt-5">
                        <div className="form-control justify-between">
                          <button className="btn bg-green-900 text-white w-full">
                            تسجيل الدخول
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
