import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditMission.scss";
import moment from "moment";
import { Loading } from "../../Loading/Loading";
import { toast } from "react-toastify";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import API from "../../../Api";
import { DatePickerComponent } from "../AddMission/SubComponents/DatePicker/DatePickerComponent";
import { MissionType } from "../AddMission/SubComponents/MissionType";
import { MissionRangePopUp } from "../AddMission/SubComponents/MissionRangePopUp/MissionRangePopUp";
import { MissionAssignPopUp } from "../AddMission/SubComponents/MissionAssignPopUp/MissionAssignPopUp";
import { BonusDatePicker } from "./SubComponents/BonusDatePicker";
import { Formik, FormikHelpers } from "formik";
import { toggleShowEditMission } from "../../../redux/Slices/MissionSlice";
import { setMainHeaderName } from "../../../redux/Slices/MainHeaderSlice";

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
  details: string;
  reward: number;
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

export const EditMission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [data, setData] = useState<{}>({});
  const [showTypePopUp, setShowTypePopUp] = useState(false);
  const [showRangePopUp, setShowRangePopUp] = useState(false);
  const [hasBonus, setHasBonus] = useState(false);
  const [showMissionAssignPopUp, setShowMissionAssignPopUp] = useState(false);

  const stateFromMissionSlice = useSelector((state: any) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale("en");

    setIsLoading(true);
    let mainHeaderName = "تعديل مهمة";
    dispatch(setMainHeaderName({ mainHeaderName }));
    API.get(`dashboard/missions/${stateFromMissionSlice.missionId}`).then(
      (res) => {
        if (res) {
          if (res.status === 403) {
            toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
            setIsLoading(false);
          } else {
            // Set the locale to Arabic
            moment.locale("ar");

            setApiResponse(res.data);
            setData(res.data);
            setIsLoading(false);
          }
        }
      }
    );
  }, [setData]);

  const handleShowTypePopUp = () => {
    setShowTypePopUp(!showTypePopUp);
  };
  const handleShowRangePopUp = () => {
    setShowRangePopUp(!showRangePopUp);
  };
  const handleShowMissionAssignPopUp = () => {
    setShowMissionAssignPopUp(!showMissionAssignPopUp);
  };
  const handleShowEditComponent = () => {
    let editIsVisible = false;
    let mainHeaderName = "الداش بورد";
    dispatch(setMainHeaderName({ mainHeaderName }));
    dispatch(toggleShowEditMission({ editIsVisible }));
  };
  const handleChangeMission = (
    value: string | number | boolean,
    field: string,
    setValues: FormikHelpers<any>["setValues"]
  ) => {
    // Update the Formik form state with the changed values

    setValues((prevValues: { apiResponse: ApiResponse }) => ({
      ...prevValues,
      apiResponse: {
        ...prevValues.apiResponse,
        [field]: value,
      },
    }));
    if (apiResponse) {
      // Create a new object with the updated field
      const updatedApiResponse: ApiResponse = {
        ...apiResponse,
        [field]: value, // Replace 'New Name' with the new value
      };

      // Update the state with the new object
      setApiResponse(updatedApiResponse);
    }
  };
  const handleEditMission = () => {
    setIsLoading(true);
    if (
      stateFromMissionSlice.workAreasIds.length === 0 &&
      apiResponse?.workAreas.length === 0
    ) {
      toast.error("من فضلك قم بأختيار نطاق المهمة");
      setIsLoading(false);
    } else if (
      stateFromMissionSlice.assignedIds.length === 0 &&
      apiResponse?.assignedUsers.length === 0
    ) {
      toast.error("من فضلك قم بتحديد لمن ستعين المهمة");
      setIsLoading(false);
    } else if (
      stateFromMissionSlice.selecteTypeId === 0 &&
      apiResponse?.type === null
    ) {
      toast.error("من فضلك قم بأختيار نوع المهمة");
      setIsLoading(false);
    } else if (apiResponse?.reward === 0) {
      toast.warn("من فضلك قم بأدخال قيمة المقابل المادي");
      setIsLoading(false);
    } else if (apiResponse?.name === "") {
      toast.warn("من فضلك قم بأدخال عنوان المهمة");
      setIsLoading(false);
    } else if (apiResponse?.early_bonus === 0) {
      toast.warn("من فضلك قم بأختيار قيمة الحافز");
      setIsLoading(false);
    } else {
      submitEditMission();
    }
  };

  const submitEditMission = () => {
    moment.locale("en");
    let x = stateFromMissionSlice.workAreasIds;
    setIsLoading(true);
    let values = {
      type_id:
        stateFromMissionSlice.selecteTypeId === 0
          ? Number(apiResponse?.type.id)
          : Number(stateFromMissionSlice.selecteTypeId),
      work_area_ids:
        stateFromMissionSlice.workAreasIds.length === 0
          ? apiResponse?.workAreas.map((item) => Number(item.id))
          : stateFromMissionSlice.workAreasIds.map((item: any) => Number(item)),
      assignment: {
        type:
          stateFromMissionSlice.assignedType.length === 0
            ? apiResponse?.assignedUsers.length !== 0
              ? "اشخاص"
              : "تخصصات"
            : stateFromMissionSlice.assignedType,
        ids:
          stateFromMissionSlice.assignedIds.length === 0
            ? apiResponse?.assignedUsers.map((item) => Number(item.id))
            : stateFromMissionSlice.assignedIds.map((item: any) =>
              Number(item)
            ),
      },
      due_at: moment(stateFromMissionSlice.dueDate).format("YYYY-MM-DD"),
      name: apiResponse?.name,
      reward: Number(apiResponse?.reward),
      early_bonus: Number(apiResponse?.early_bonus),
      early_bonus_due_at: apiResponse?.early_bonus_due_at,
      maps_url: apiResponse?.maps_url,
    };
    if (stateFromMissionSlice.markAfterEdit === true) {
      API.post(
        `dashboard/missions/${stateFromMissionSlice.missionId}/complete`,
        values
      )
        .then((response) => {
          if (response) {
            toast.success("تمت تعديل المهمة وتعيينها كتامة بنجاح");
            let editIsVisible = false;
            dispatch(toggleShowEditMission({ editIsVisible }));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error:", error);
          setIsLoading(false);

          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        });
    } else {
      API.patch(`dashboard/missions/${stateFromMissionSlice.missionId}`, values)
        .then((response) => {
          if (response) {
            toast.success("تمت تعديل المهمة بنجاح");
            let editIsVisible = false;
            dispatch(toggleShowEditMission({ editIsVisible }));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error:", error);
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
          setIsLoading(false);
          toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
        });
    }
  };
  return (
    <div className="EditMission">

      <Formik
        onSubmit={() => handleEditMission()}
        initialValues={{ apiResponse: apiResponse || null }} // Handle null case
        validationSchema={null}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setValues,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
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
                            : apiResponse?.type.name}
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
                        value={values.apiResponse?.name}
                        name="apiResponse.name"
                        onChange={(e) =>
                          handleChangeMission(e.target.value, "name", setValues)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-start-2 mt-4 mb-4 pl-4">
                    <DatePickerComponent
                      activation={false}
                      due_date={
                        apiResponse?.due_at
                          ? new Date(apiResponse.due_at)
                          : new Date()
                      }
                      isEdit={true}
                    />
                  </div>
                  {/* Mission Details */}
                  <div className="col-start-1 mt-4 mb-4 pr-4">
                    <h3 className="mission-type"> تفاصيل المهمة</h3>
                  </div>
                  <div className="col-span-full pr-4 pl-4">
                    <div className="txt-area">
                      <textarea
                        style={{ width: "100%" }}
                        className="mission-text-area"
                        placeholder="تفاصيل المهمة"
                        value={apiResponse?.details}
                        onChange={(e) =>
                          handleChangeMission(
                            e.target.value,
                            "details",
                            setValues
                          )
                        }
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
                        value={values.apiResponse?.maps_url}
                        onChange={(e) =>
                          handleChangeMission(
                            e.target.value,
                            "maps_url",
                            setValues
                          )
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
                <div className="grid grid-cols-2">
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
                  <div className="col-span-full mt-4 mb-4 pr-4 pl-20">
                    <div>
                      <input
                        type="text"
                        placeholder="00"
                        className="mission-map-input"
                        value={values.apiResponse?.reward}
                        onChange={(e) =>
                          handleChangeMission(
                            e.target.value,
                            "reward",
                            setValues
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-start-1 mt-4  pr-4">
                    <div className="bonus flex gap-4 items-center">
                      <span className="bonus-text">
                        حافز للأداء الإستثنائي ؟
                      </span>
                      <input
                        type="checkbox"
                        className="switch switch-success"
                        checked={
                          values.apiResponse?.early_bonus === 0 ? false : true
                        }
                        onChange={() => setHasBonus(!hasBonus)}
                      />
                    </div>
                  </div>

                  {apiResponse?.early_bonus !== 0 &&
                    apiResponse?.early_bonus != null ? (
                    <>
                      <div className="col-start-2 mt-4  pr-4">
                        <div className="bonus flex gap-4 items-center">
                          <span className="bonus-text">
                            تاريخ الحافز الاستثنائي{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-start-1 mt-4 mb-4 pr-4 pl-20">
                        <div>
                          <input
                            type="text"
                            placeholder="00"
                            className="mission-map-input"
                            value={values.apiResponse?.early_bonus}
                            onChange={(e) =>
                              handleChangeMission(
                                e.target.value,
                                "early_bonus",
                                setValues
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="col-start-2 mt-4 mb-4 pl-4">
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
                      <button className="add-btn" type="submit">
                        {stateFromMissionSlice.markAfterEdit === true
                          ? "تعديل وتعيين كتامة"
                          : "تعديل"}
                      </button>
                      <div
                        className="cancel-btn"
                        onClick={() => handleShowEditComponent()}
                      >
                        الغاء
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </Formik>

      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      {showTypePopUp === true ? (
        <MissionType isEdit={true} typeId={apiResponse?.type.id} />
      ) : null}
      {showRangePopUp === true ? (
        <MissionRangePopUp isEdit={true} workAreas={apiResponse?.workAreas} />
      ) : null}
      {showMissionAssignPopUp === true ? <MissionAssignPopUp /> : null}
    </div>
  );
};
