import "./DeleteMission.scss";
import closeIcon from "../../../Assets/Icons/closeicon.svg";
import API from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showDetailsPopUp } from "../../../redux/Slices/MissionSlice";

export const DeleteMission = () => {
  const stateFromMissionSlice = useSelector((state: any) => state.missions);
  const dispatch = useDispatch();

  const submitChoise = () => {
    API.delete(`dashboard/missions/${stateFromMissionSlice.missionId}`).then(
      (res) => {
        if (res.status === 200) {
          toast.success("لقد تم حذف المهمة بنجاح");
          let isDetailsActive = false;
          dispatch(showDetailsPopUp({ isDetailsActive }));
          //Todo : Remove This Object From Mission Page
          window.location.reload();
        } else {
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
          let isDetailsActive = true;
          dispatch(showDetailsPopUp({ isDetailsActive }));
        }
      }
    );
  };
  return (
    <div className="DeleteMission">
      <input className="modal-state" id="modal-11" type="checkbox" />
      <div className="modal w-full">
        <label className="modal-overlay" htmlFor="modal-11"></label>
        <div
          className="modal-content flex flex-col gap-5"
          style={{
            backgroundColor: "white",
            width: "2500px",
          }}
        >
          <div className="grid grid-cols-2">
            <div className="col-start-1">
              <h2 className="flex justify-start mission-type-txt">
                حذف المهمة
              </h2>
            </div>

            <div className="col-start-2 mb-4 flex justify-end">
              <div className="flex gap-4">
                <label htmlFor="modal-11">
                  <img src={closeIcon} alt="close" />
                </label>
              </div>
            </div>
            <div className="col-span-full mb-2">
              <div className="divider"></div>
            </div>
            <div className="col-span-full mb-4">
              <span className="are-you-sure flex justify-start">
                هل انت متاكد من انك تريد حذف المهمة ؟
              </span>
            </div>
            <div className="col-span-full">
              <div className="flex actions gap-4">
                <label htmlFor="modal-11">
                  <div className="done" onClick={() => submitChoise()}>
                    نعم
                  </div>
                </label>
                <label htmlFor="modal-11">
                  <div className="cancel">لا</div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
