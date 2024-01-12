import { useState } from "react";
import { selectedMissionType, toggleShowAddMission } from "../../../redux/Slices/MissionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MissionsHeader = () => {
    const [activeElement, setActiveElement] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleActiveElement = (id: number) => {
        setActiveElement(id);
        let type = id;
        dispatch(selectedMissionType({ type }));
    };
    const showAddMission = () => {
        navigate("Add")

    };
    return (
        <div className="MissionsHeader">
            <div className="grid grid-cols-2 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 "
                style={{ backgroundColor: "#FFF" }}>

                <div className="col-start-1 flex col-span-2 sm:col-start-1">
                    <div
                        onClick={() => handleActiveElement(1)}
                        className={
                            activeElement === 1 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة قيد الأنتظار
                    </div>
                    <div
                        onClick={() => handleActiveElement(2)}
                        className={
                            activeElement === 2 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة تحت التنفيذ
                    </div>
                    <div
                        onClick={() => handleActiveElement(3)}
                        className={
                            activeElement === 3 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة متأخرة
                    </div>
                    <div
                        onClick={() => handleActiveElement(4)}
                        className={
                            activeElement === 4 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة تامة تنتظر التقييم
                    </div>
                    <div
                        onClick={() => handleActiveElement(5)}
                        className={
                            activeElement === 5 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة تامة
                    </div>

                    <div
                        onClick={() => handleActiveElement(6)}
                        className={
                            activeElement === 6 ? "main-element-active" : "main-element"
                        }
                    >
                        مهمة مرفوضة
                    </div>

                </div>
                <div className="col-start-2 col-end-5 flex justify-end">
                    <div className="flex">
                        {/* Filter Btn */}
                        <div className="filter-section flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M4.58342 4.16669H15.4168C15.5368 4.20878 15.6456 4.27778 15.7348 4.36841C15.824 4.45903 15.8913 4.56888 15.9315 4.68954C15.9718 4.81019 15.9838 4.93845 15.9668 5.06449C15.9498 5.19053 15.9042 5.31101 15.8334 5.41669L11.6668 10V15.8334L8.33342 13.3334V10L4.16676 5.41669C4.096 5.31101 4.05037 5.19053 4.03336 5.06449C4.01636 4.93845 4.02842 4.81019 4.06864 4.68954C4.10886 4.56888 4.17616 4.45903 4.26539 4.36841C4.35462 4.27778 4.46341 4.20878 4.58342 4.16669Z"
                                    stroke="#64748B"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            الفلتر
                        </div>
                        {/* Add Button */}
                        <div className="add-mission-btn" onClick={() => showAddMission()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                            >
                                <path
                                    d="M10.5049 1.02539C6.02189 1.02539 2.375 4.67228 2.375 9.15527C2.375 13.6383 6.02189 17.2852 10.5049 17.2852C14.9879 17.2852 18.6348 13.6383 18.6348 9.15527C18.6348 4.67228 14.9879 1.02539 10.5049 1.02539ZM14.0617 9.83272H11.1823V12.7121C11.1823 13.0861 10.8789 13.3895 10.5049 13.3895C10.1309 13.3895 9.82743 13.0861 9.82743 12.7121V9.83272H6.94806C6.57404 9.83272 6.27061 9.52929 6.27061 9.15527C6.27061 8.78126 6.57404 8.47782 6.94806 8.47782H9.82743V5.59845C9.82743 5.22443 10.1309 4.921 10.5049 4.921C10.8789 4.921 11.1823 5.22443 11.1823 5.59845V8.47782H14.0617C14.4357 8.47782 14.7392 8.78126 14.7392 9.15527C14.7392 9.52929 14.4357 9.83272 14.0617 9.83272Z"
                                    fill="white"
                                />
                            </svg>
                            اضافة مهمة
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}