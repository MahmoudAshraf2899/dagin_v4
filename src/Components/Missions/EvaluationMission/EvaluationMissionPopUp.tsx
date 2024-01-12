import "./EvaluationMission.scss";
import closeIcon from "../../../Assets/Icons/closeicon.svg";
import userPhoto from "../../../Assets/Icons/user.jpeg";
import { toast } from "react-toastify";
import moment from "moment";
import { useEffect, useState } from "react";
import API from "../../../Api";
import { Loading } from "../../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/ar"; // Import the Arabic locale
import { ar, enUS } from "date-fns/locale";
import { format } from "date-fns";
import { DeleteMission } from "../DeleteMission/DeleteMission";
import {
  sendMissionIdToPopUp,
  showDetailsPopUp,
  toggleShowEditMission,
} from "../../../redux/Slices/MissionSlice";
import { MarkAsCompleted } from "./SubComponents/MarkAsCompleted/MarkAsCompleted";
import { RefuseMission } from "./SubComponents/RefuseMission/RefuseMission";
import { useNavigate } from "react-router-dom";
interface ApiResponse {
  id: string;
  created_at: string;
  updated_at: string;
  full_address: string;
  latitude: string;
  longitude: string;
  maps_url: string;
  name: string;
  audience: string;
  status: string;
  reward: number;
  details: string;
  due_at: string;
  early_bonus: number;
  early_bonus_due_at: string;
  accepted_at: string | null;
  req_review_at: string | null;
  completed_at: string | null;
  salesman_id: string | null;
  housing_id: string | null;
  farm_id: string | null;
  farmer_id: string | null;
  trader_id: string | null;
  salesman: string | null;
  type: {
    id: string;
    name: string;
  };
  workAreas: {
    id: string;
    name: string;
  }[];
  assignedUsers: {
    id: string;
    name: string;
  }[];
  assignedSpecialties: any[]; // Adjust the type accordingly
  breeder: any; // Adjust the type accordingly
  farm: any; // Adjust the type accordingly
}
let createdAtDate_Arabic = "";
let dueDate_Arabic = "";
let assignDateArabic = "";
export const EvaluationMissionPopUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{}>({});
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [showDeletePopUp, seShowDeletePopUp] = useState(false);
  const [showMarkAsCompletedPopUp, setShowMarkAsCompleted] = useState(false);
  const [showRefuseMissionPopUp, setShowRefuseMissionPopUp] = useState(false);

  const stateFromMissionSlice = useSelector((state: any) => state.missions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    API.get(`dashboard/missions/${stateFromMissionSlice.missionId}`).then(
      (res) => {
        if (res) {
          if (res.status === 403) {
            toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
            setIsLoading(false);
          } else {
            const createdAtDate = moment(res.data.created_at);
            const dueDate = moment(res.data.due_at);
            const assingedAt = moment(res.data.created_at);

            // Set the locale to Arabic
            moment.locale("ar");
            createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
            dueDate_Arabic = dueDate.format("DD MMMM YYYY");

            const assignedHour = assingedAt.hours();
            let date_type = "مساءً";
            if (assignedHour < 12) date_type = "صباحا";

            assignDateArabic = assingedAt.format(
              `DD MMMM YYYY -   HH:mm  ${date_type}`
            );
            setApiResponse(res.data);
            setIsLoading(false);
          }
        }
      }
    );
  }, [setData]);


  const handleShowMarkAsCompletedPopUp = (missionId: Number) => {
    dispatch(sendMissionIdToPopUp({ missionId }));
    setShowMarkAsCompleted(!showMarkAsCompletedPopUp);
  };
  const handleShowRefuseMissionPopUp = (missionId: Number) => {
    dispatch(sendMissionIdToPopUp({ missionId }));
    setShowRefuseMissionPopUp(!showMarkAsCompletedPopUp);
  };
  const hideMissionDetailsPopUp = () => {
    let isDetailsActive = false;

    dispatch(showDetailsPopUp({ isDetailsActive }));
  };
  const handleShowEditMission = (missionId: number) => {
    hideMissionDetailsPopUp();
    dispatch(sendMissionIdToPopUp({ missionId }));
    let isVisible = true;
    let markAfterEdit = true;
    dispatch(toggleShowEditMission({ isVisible, markAfterEdit }));
    navigate(`Edit/${missionId}`)
  };

  return (
    <div className="EvaluationMission">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div
          className="modal-content flex flex-col gap-5"
          style={{
            backgroundColor: "white",
          }}
        >
          {showDeletePopUp === true ? <DeleteMission /> : null}
          {showMarkAsCompletedPopUp === true ? <MarkAsCompleted /> : null}
          {showRefuseMissionPopUp === true ? <RefuseMission /> : null}

          <div className="grid grid-cols-2">
            <div className="col-start-1">
              <h2 className="flex justify-start mission-details">
                تفاصيل المهمة
              </h2>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4">
                <label
                  htmlFor="modal-1"
                  onClick={() => hideMissionDetailsPopUp()}
                >
                  <img src={closeIcon} alt="close" />
                </label>
              </div>
            </div>
            <div className="col-span-full">
              <div className="divider"></div>
            </div>

            <div className="col-start-1">
              <span className="mission-type flex justify-start">
                {apiResponse?.type.name}
              </span>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="inprogress">مهمة تامة تنتظر التقييم</div>
            </div>
            <div className="col-start-1">
              <span className="mission-address flex justify-start mb-4">
                {apiResponse?.name}
              </span>
            </div>
            <div className="col-start-2"></div>
            <div className="col-span-full">
              <div className="flex gap-4 mb-4">
                <div className="mission-reward">
                  السعر {apiResponse?.reward} جنيه
                </div>
                <div className="created-at">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                    <path
                      d="M1.875 6.125H13.125"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 1.75L5 3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 1.75V3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                  </svg>
                  انشئت في : {createdAtDate_Arabic}
                </div>

                <div className="created-at">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                    <path
                      d="M1.875 6.125H13.125"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 1.75L5 3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 1.75V3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                  </svg>
                  تنتهي في : {dueDate_Arabic}
                </div>
              </div>
            </div>
            {/* نطاق المهمة */}
            <div className="col-span-full">
              <span className="mission-range flex justify-start mb-4">
                النطاق
              </span>
            </div>
            <div className="col-span-full">
              <div className="flex gap-4 mb-4">
                {apiResponse?.workAreas.map((item) => {
                  return (
                    <div className="range" key={item.id}>
                      <svg
                        className="location-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="14"
                        viewBox="0 0 11 14"
                        fill="none"
                      >
                        <path
                          d="M2.14575 2.3796L2.14575 2.3796C3.9996 0.493217 7.00045 0.493221 8.85427 2.37959C10.7192 4.2773 10.7088 7.40685 8.86152 9.23578L8.8559 9.24135L8.8504 9.24703L5.49605 12.7111L2.14574 9.3021C0.284754 7.40848 0.28475 4.27324 2.14575 2.3796ZM3.58905 5.81128C3.58905 6.8629 4.43502 7.74263 5.50003 7.74263C6.56499 7.74263 7.41093 6.86287 7.41093 5.81128C7.41093 4.75973 6.56497 3.88 5.50003 3.88C4.43505 3.88 3.58905 4.7597 3.58905 5.81128Z"
                          stroke="#9BA0B1"
                          stroke-width="1.5"
                        />
                      </svg>

                      <span className="range-txt">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* تعيين المهمة ل */}
            <div className="col-span-full">
              <div className="grid mb-4">
                <span className="mission-assign-txt flex justify-start mb-4">
                  تعيين المهمة ل
                </span>
                <span className="assigned-at">
                  تم الاسناد في {assignDateArabic}
                </span>
              </div>
            </div>
            {/* من اسندت لهم */}
            <div className="col-span-full">
              <div className="flex gap-4 mb-4">
                {apiResponse?.assignedUsers.map((item) => {
                  return (
                    <div className="flex user-card gap-4">
                      <div>
                        <img src={userPhoto} alt="user" />
                      </div>
                      <span className="user-name">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* description */}
            <div className="col-span-full">
              <span className="discription flex justify-start">الوصف</span>
            </div>
            {/* discription content */}
            <div className="col-span-full mb-4">
              <span className="description-content flex justify-start">
                {apiResponse?.details}
              </span>
            </div>
            <div className="col-span-full mb-4">
              <div className="flex justify-start gap-4 actions">
                <label htmlFor="modal-3">
                  <div
                    className="mark-completed-btn"
                    onClick={() =>
                      handleShowMarkAsCompletedPopUp(Number(apiResponse?.id))
                    }
                  >
                    تحديد كمهمة تامة
                  </div>
                </label>
                <div
                  className="edit-mission-btn"
                  onClick={() => handleShowEditMission(Number(apiResponse?.id))}
                >
                  تعديل وتعيين كتامة
                </div>
                <label htmlFor="modal-4">
                  <div
                    className="refuse-mission-btn"
                    onClick={() =>
                      handleShowRefuseMissionPopUp(Number(apiResponse?.id))
                    }
                  >
                    رفض المهمة
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
