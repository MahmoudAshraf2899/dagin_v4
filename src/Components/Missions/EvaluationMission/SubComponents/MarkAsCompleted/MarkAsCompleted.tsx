import "./MarkAsCompleted.scss";
import closeIcon from "../../../../../Assets/Icons/closeicon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../../../Api";
import { showDetailsPopUp } from "../../../../../redux/Slices/MissionSlice";

export const MarkAsCompleted = () => {
  const stateFromMissionSlice = useSelector((state: any) => state.missions);
  const dispatch = useDispatch();
  const submitMarkAsCompleted = () => {
    API.post(
      `dashboard/missions/${stateFromMissionSlice.missionId}/complete`
    ).then((res) => {
      if (res.status === 201) {
        toast.success("تم تحديد المهمة كمهمة تامة بنجاح");
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
    <div className="MarkAsCompleted">
      <input className="modal-state" id="modal-3" type="checkbox" />
      <div className="modal">
        <div
          className="modal-content flex flex-col gap-5"
          style={{
            backgroundColor: "white",
          }}
        >
          <div className="grid grid-cols-2">
            <div className="col-start-1">
              <h2 className="flex justify-start mission-details">
                تحديد كمهمة المهمة
              </h2>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4">
                <label htmlFor="modal-3">
                  <img src={closeIcon} alt="close" />
                </label>
              </div>
            </div>
            <div className="col-span-full">
              <div className="divider"></div>
            </div>
            <div className="col-span-full">
              <span className="sure-completed flex justify-start">
                هل انت متأكد من انك تريد تحديد المهمة كمهمة تامة ؟
              </span>
            </div>
            <div className="col-span-1 mt-4 mb-4">
              <div className="flex gap-4 justify-start yes-no-section">
                <label htmlFor="modal-3">
                  <div
                    className="yes-btn"
                    onClick={() => submitMarkAsCompleted()}
                  >
                    نعم
                  </div>
                </label>
                <label htmlFor="modal-3">
                  {" "}
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
