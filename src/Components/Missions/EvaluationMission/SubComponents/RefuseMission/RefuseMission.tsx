import "./RefuseMission.scss";
import closeIcon from "../../../../../Assets/Icons/closeicon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../../../Api";
import { showDetailsPopUp } from "../../../../../redux/Slices/MissionSlice";
import { setTimeout } from "timers/promises";
export const RefuseMission = () => {
  const stateFromMissionSlice = useSelector((state: any) => state.missions);
  const dispatch = useDispatch();
  const submitRefuseMission = () => {
    API.post(
      `dashboard/missions/${stateFromMissionSlice.missionId}/reject`
    ).then((res) => {
      if (res.status === 201) {
        toast.success("تم رفض المهمة بنجاح");
        let isDetailsActive = false;
        dispatch(showDetailsPopUp({ isDetailsActive }));

        window.location.reload();
      } else {
        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        let isDetailsActive = true;
        dispatch(showDetailsPopUp({ isDetailsActive }));
      }
    });
  };
  return (
    <div className="RefuseMission">
      <input className="modal-state" id="modal-4" type="checkbox" />
      <div className="modal">
        <div
          className="modal-content flex flex-col gap-5"
          style={{
            backgroundColor: "white",
          }}
        >
          <div className="grid grid-cols-2">
            <div className="col-start-1">
              <h2 className="flex justify-start mission-details">رفض المهمة</h2>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4">
                <label htmlFor="modal-4">
                  <img src={closeIcon} alt="close" />
                </label>
              </div>
            </div>
            <div className="col-span-full">
              <div className="divider"></div>
            </div>
            <div className="col-span-full">
              <span className="sure-completed flex justify-start">
                هل انت متأكد من انك تريد رفض المهمة ؟
              </span>
            </div>
            <div className="col-span-1 mt-4 mb-4">
              <div className="flex gap-4 justify-start yes-no-section">
                <label>
                  <div
                    className="yes-btn"
                    onClick={() => submitRefuseMission()}
                  >
                    نعم
                  </div>
                </label>
                <label htmlFor="modal-4">
                  <div className="no-btn">لا</div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
