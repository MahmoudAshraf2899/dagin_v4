import "./MainHeader.scss";
import userProfileImg from "../../Assets/Icons/40px.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MainHeader = () => {
  const navigate = useNavigate();
  const stateFromMissionSlice = useSelector((state: any) => state.mainHeader);
  const submitSignOut = () => {
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <div className="grid grid-cols-2 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 gap-4 MainHeader">
      <div className="col-start-1 col-end-1 sm:col-start-1">
        <span className="Module-name">{stateFromMissionSlice.name}</span>
      </div>
      <div className="col-start-2">
        <div className="flex justify-around">
          {/* Input Field */}
          <div className="form-control relative">
            <input
              type="email"
              className="input input-lg max-w-full search-input bg-white"
              placeholder="ابحث"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                  stroke="#64748B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5001 17.5L14.1667 14.1667"
                  stroke="#64748B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          {/* Notification Icon */}
          <div className="icon">
            <div className="overlap-group">
              <div className="ellipse" />
            </div>
          </div>
          {/* Profile Section */}
          <div>
            <div className="profile-section flex gap-4">
              <div className="user-profile">
                <img src={userProfileImg} alt="user-photo" />
              </div>
              <div className="grid">
                <span className="user-name">
                  {localStorage.getItem("userName")}
                </span>
                <span className="user-role">ادمن</span>
              </div>
            </div>
          </div>
          {/* Log Out Section */}
          <div className="log-out">
            <div className="popover" style={{ backgroundColor: "white" }}>
              <svg
                className="popover-trigger arrow"
                tabIndex={0}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  stroke="#94A3B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div className="popover-content popover-bottom-left" tabIndex={0}>
                <ul>
                  <label
                    className="three-dots-li"
                  // htmlFor="modal-1"
                  // onClick={() => ShowMissionDetailsPopUp(item.id)}
                  >
                    اعدادات الحساب
                  </label>
                  <input
                    className="modal-state"
                    // id="modal-1"
                    type="checkbox"
                  />

                  <label
                    className="three-dots-li-delete"
                    onClick={() => submitSignOut()}
                  >
                    تسجيل الخروج
                  </label>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
