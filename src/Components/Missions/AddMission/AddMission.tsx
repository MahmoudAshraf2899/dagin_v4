import "./AddMission.scss";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import { MissionType } from "./SubComponents/MissionType";
import { useEffect, useState } from "react";
import { DatePickerComponent } from "./SubComponents/DatePicker/DatePickerComponent";
import { MissionRangePopUp } from "./SubComponents/MissionRangePopUp/MissionRangePopUp";
import { MissionAssignPopUp } from "./SubComponents/MissionAssignPopUp/MissionAssignPopUp";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAddMission } from "../../../redux/Slices/MissionSlice";
import API from "../../../Api";
import { toast } from "react-toastify";
import { Loading } from "../../Loading/Loading";
import moment from "moment";
import { setMainHeaderName } from "../../../redux/Slices/MainHeaderSlice";
import { BonusDatePicker } from "../EditMission/SubComponents/BonusDatePicker";

const missionData = {
  type_id: 0,
  name: "",
  due_at: "",
  details: "",
  reward: 0,
  maps_url: "",
  early_bonus_due_at: "",
  early_bonus: 0,
  work_area_ids: [],
  assignment: {
    type: [],
    ids: [],
  },
};
export const AddMission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTypePopUp, setShowTypePopUp] = useState(false);
  const [showRangePopUp, setShowRangePopUp] = useState(false);
  const [hasBonus, setHasBonus] = useState(false);
  const [showMissionAssignPopUp, setShowMissionAssignPopUp] = useState(false);
  const stateFromMissionSlice = useSelector((state: any) => state.missions);

  const dispatch = useDispatch();
  const handleShowAddComponent = () => {
    let isVisible = false;
    let mainHeaderName = "الداش بورد";
    dispatch(setMainHeaderName({ mainHeaderName }));
    dispatch(toggleShowAddMission({ isVisible }));
  };

  const handleShowTypePopUp = () => {
    setShowTypePopUp(!showTypePopUp);
  };
  const handleShowRangePopUp = () => {
    setShowRangePopUp(!showRangePopUp);
  };
  const handleShowMissionAssignPopUp = () => {
    setShowMissionAssignPopUp(!showMissionAssignPopUp);
  };

  useEffect(
    () => {
      let mainHeaderName = "اضافة مهمة";
      dispatch(setMainHeaderName({ mainHeaderName }));
    },
    []
  );
  const handleChangeMission = (e: any, field: string) => {
    if (field === "name") {
      missionData.name = e;
    } else if (field === "details") {
      missionData.details = e;
    } else if (field === "reward") {
      missionData.reward = Number(e);
    } else if (field === "early_bonus") {
      missionData.early_bonus = Number(e);
    } else if (field === "maps_url") {
      missionData.maps_url = e;
    }
  };
  const handleAddNewMission = () => {
    /* Validations */

    setIsLoading(true);
    if (stateFromMissionSlice.selecteTypeId === 0) {
      // نوع المهمة
      toast.error("من فضلك قم بأختيار نوع المهمة");
      setIsLoading(false);
    } else if (missionData.name === "") {
      toast.error("من فضلك قم بأدخال عنوان المهمة");
      setIsLoading(false);
    } else if (stateFromMissionSlice.workAreasIds.length === 0) {
      toast.error("من فضلك قم بأختيار نطاق المهمة");
      setIsLoading(false);
    } else if (stateFromMissionSlice.assignedIds.length === 0) {
      toast.error("من فضلك قم بأختيار لمن سيتم تعيين المهمة");
      setIsLoading(false);
    } else if (missionData.reward === 0) {
      toast.error("من فضلك قم بأدخال قيمة المقابل المادي");
      setIsLoading(false);
    } else if (stateFromMissionSlice.isDateChanged === false) {
      toast.error("من فضلك قم بأختيار تاريخ الأنتهاء");
      setIsLoading(false);
    } else if (hasBonus === true) {
      if (missionData.early_bonus === 0) {
        toast.error("من فضلك قم بأدخال قيمة الحافز ");
        setIsLoading(false);
      } else {
        confirmAddMission();
      }
    } else {
      confirmAddMission();
    }
  };
  const confirmAddMission = () => {
    setIsLoading(true);
    moment.locale("en");
    missionData.type_id = Number(stateFromMissionSlice.selecteTypeId);
    missionData.work_area_ids = stateFromMissionSlice.workAreasIds.map(
      (item: any) => Number(item)
    );
    missionData.assignment = {
      type: stateFromMissionSlice.assignedType,
      ids: stateFromMissionSlice.assignedIds.map((item: any) => Number(item)),
    };

    missionData.due_at = moment(stateFromMissionSlice.dueDate).format(
      "YYYY-MM-DD"
    );
    missionData.early_bonus_due_at = moment(stateFromMissionSlice.BonusDate).format("YYYY-MM-DD");

    if (
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
        missionData.maps_url
      ) === false
    ) {
      toast.error("من فضلك قم بأدخال رابط الموقع الجغرافي بطريقة صحيحة");
      setIsLoading(false);
    } else {
      API.post("dashboard/missions", missionData)
        .then((response) => {
          if (response) {
            toast.success("تمت أضافة المهمة بنجاح");
            setIsLoading(false);
            handleShowAddComponent();
          }
        })
        .catch((error) => {
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="AddMission">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      {showTypePopUp === true ? <MissionType isEdit={false} /> : null}
      {showRangePopUp === true ? <MissionRangePopUp isEdit={false} /> : null}
      {showMissionAssignPopUp === true ? <MissionAssignPopUp /> : null}
      {/* First Section [Mission Details] */}
      <div className="add-section mb-4">
        <div className="grid grid-cols-2">
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h2 className="flex justify-start mission-details">
              تفاصيل المهمة
            </h2>
          </div>
          <div className="col-span-full mb-4">
            <div className="divider"></div>
          </div>
          {/* نوع المهمة */}
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h3 className="mission-type"> نوع المهمة</h3>
          </div>
          <div className="col-span-full pr-4">
            <label htmlFor="modal-8">
              <div className="flex justify-between select-mission-container">
                <div className="select-mission-type pr-4">
                  {stateFromMissionSlice.selecteTypeId !== 0
                    ? stateFromMissionSlice.selectedTypeName
                    : "اختر نوع المهمة"}
                </div>
                <div className="arrow">
                  <img
                    src={arrow}
                    alt="arrow"
                    onClick={() => handleShowTypePopUp()}
                  />
                </div>
              </div>
            </label>
          </div>
          <div className="col-start-1 mt-4  pr-4">
            <h3 className="mission-type"> عنوان المهمة</h3>
          </div>
          <div className="col-start-2 mt-4  pr-4">
            <h3 className="mission-type"> تاريخ الأنتهاء</h3>
          </div>

          <div className="col-start-1 mt-4 mb-4 pr-4">
            <div>
              <input
                type="text"
                placeholder="عنوان المهمة"
                className="mission-address-input"
                onChange={(e) => handleChangeMission(e.target.value, "name")}
              />
            </div>
          </div>
          <div className="col-start-2 mt-4 mb-4 pl-4">
            <DatePickerComponent activation={false} isEdit={false} />
          </div>

          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h3 className="mission-type"> تفاصيل المهمة</h3>
          </div>
          <div className="col-span-full pr-4 pl-4">
            <div className="txt-area">
              <textarea
                style={{ width: "100%" }}
                className="mission-text-area"
                placeholder="تفاصيل المهمة"
                onChange={(e) => handleChangeMission(e.target.value, "details")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Second Section [Mission Range and Assign Mission] */}
      <div className="add-section mb-4">
        <div className="grid grid-cols-2">
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h2 className="flex justify-start mission-details">
              النطاق واسناد المهمة
            </h2>
          </div>
          <div className="col-span-full mb-4">
            <div className="divider"></div>
          </div>
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h3 className="mission-type"> نطاق المهمة</h3>
          </div>
          <div className="col-span-full pr-4">
            <label htmlFor="modal-9">
              <div className="flex justify-between select-mission-container">
                <div className="select-mission-type pr-4">
                  {stateFromMissionSlice.workAreasIds.length !== 0
                    ? stateFromMissionSlice.workAreasTitle
                    : " اختر محافظة او مدينة او اكثر"}
                </div>
                <div className="arrow">
                  <img
                    src={arrow}
                    alt="arrow"
                    onClick={() => handleShowRangePopUp()}
                  />
                </div>
              </div>
            </label>
          </div>

          <div className="col-start-1 mt-4  pr-4">
            <h3 className="mission-type"> رابط الموقع الجغرافي</h3>
          </div>
          <div className="col-span-full mt-4 mb-4 pr-4 pl-20">
            <div>
              <input
                id="mapUrl"
                type="text"
                placeholder="قم بأدخال الرابط"
                className="mission-map-input"
                onChange={(e) =>
                  handleChangeMission(e.target.value, "maps_url")
                }
              />
            </div>
          </div>
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h3 className="mission-type"> تعيين المهمة ل </h3>
          </div>
          <div className="col-span-full pr-4">
            <label htmlFor="modal-10">
              <div className="flex justify-between select-mission-container">
                <div className="select-mission-type pr-4">
                  {stateFromMissionSlice.assignedIds.length !== 0
                    ? stateFromMissionSlice.assignedText
                    : "اختر شخص او تخصص او اكثر"}
                </div>
                <div className="arrow">
                  <img
                    src={arrow}
                    alt="arrow"
                    onClick={() => handleShowMissionAssignPopUp()}
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Third Section [المقابل المادي] */}
      <div className="add-reward-section mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-start-1 mt-4 mb-4 pr-4">
            <h2 className="flex justify-start mission-details">
              المقابل المادي
            </h2>
          </div>
          <div className="col-span-full mb-4">
            <div className="divider"></div>
          </div>
          <div className="col-start-1 mt-4  pr-4">
            <h3 className="mission-type"> المقابل المادي</h3>
          </div>
          <div className="col-span-full   mb-4 pr-4 pl-20">
            <div>
              <input
                type="text"
                placeholder="00"
                className="mission-map-input"
                onChange={(e) => handleChangeMission(e.target.value, "reward")}
              />
            </div>
          </div>

          <div className="col-start-1 pr-4">
            <div className="bonus flex gap-4 items-center">
              <span className="bonus-text">حافز للأداء الإستثنائي ؟</span>
              <input
                type="checkbox"
                className="switch switch-success"
                checked={hasBonus}
                onChange={() => setHasBonus(!hasBonus)}
              />
            </div>
          </div>
          {hasBonus === true ? (
            <>
              <div className="col-start-2  pr-4">
                <div className="bonus flex gap-4 items-center">
                  <span className="bonus-text">
                    تاريخ الحافز الاستثنائي
                  </span>
                </div>
              </div>
              <div className="col-start-1  pr-4">
                <div>
                  <input
                    type="text"
                    placeholder="00"
                    className="mission-map-input"
                    onChange={(e) =>
                      handleChangeMission(e.target.value, "early_bonus")
                    }
                  />
                </div>
              </div>
              <div className="col-start-2  mb-4 ">
                <BonusDatePicker activation={false} />
              </div>
            </>
          ) : null}
        </div>
      </div>
      {/* Fourth Section [Done Or cancel] */}
      <div className="add-actions p-5">
        <div className="grid grid-cols-2">
          <div className="col-start-1">
            <div className="flex gap-4">
              <div className="add-btn" onClick={() => handleAddNewMission()}>
                اضافة
              </div>
              <div
                className="cancel-btn"
                onClick={() => handleShowAddComponent()}
              >
                الغاء
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
