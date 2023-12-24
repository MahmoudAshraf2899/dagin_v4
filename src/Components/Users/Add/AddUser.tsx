import './AddUser.scss'
import moment from "moment";
import { toast } from "react-toastify";
import API from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { toggleShowAddUser } from '../../../redux/Slices/UsersSlice';
import { useEffect, useState } from "react";
import arrow from "../../../Assets/Icons/arrow.jpeg";
const userData = {
    type_id: 0,
    name: "",
    due_at: "",
    details: "",
    reward: 0,
    maps_url: "",
    early_bonus_due_at: new Date(),
    early_bonus: 0,
    work_area_ids: [],
    assignment: {
        type: [],
        ids: [],
    },
};
export const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const dispatch = useDispatch();
    const handleShowAddComponent = () => {
        let visible = false;
        let mainHeaderName = "الداش بورد";
        dispatch(setMainHeaderName({ mainHeaderName }));
        dispatch(toggleShowAddUser({ visible }));
    };
    useEffect(
        () => {
            let mainHeaderName = "اضافة مستخدم";
            dispatch(setMainHeaderName({ mainHeaderName }));
        },
        []
    );

    return (
        <div className="AddUser">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            <div className="add-section mb-4">
                <div className="grid grid-cols-2">
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h2 className="flex justify-start add-details">
                            اضافة مستخدم
                        </h2>
                    </div>
                    <div className="col-span-full mb-4">
                        <div className="divider"></div>
                    </div>
                    {/* الاسم الاول */}
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h3 className="first-name"> الاسم الاول</h3>
                    </div>
                    <div className="col-start-2 mt-4 mb-4 pr-4">
                        <h3 className="last-name"> الاسم الأخير</h3>
                    </div>

                    {/*First Name Input*/}
                    <div className="col-start-1  mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="الاسم الأول"
                                className="first-name-input"
                            // onChange={(e) => handleChangeMission(e.target.value, "name")}
                            />
                        </div>
                    </div>

                    {/*Last Name input */}
                    <div className="col-start-2  mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="الاسم الأخير"
                                className="first-name-input"
                            // onChange={(e) => handleChangeMission(e.target.value, "name")}
                            />
                        </div>
                    </div>

                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                        <h3 className="last-name"> الرقم القومي</h3>
                    </div>

                    <div className='col-start-2 mt-4 mb-4 pr-4'>
                        <h3 className="last-name"> رقم الهاتف</h3>
                    </div>

                    {/* National Id Input*/}
                    <div className="col-start-1  mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="الرقم القومي"
                                className="first-name-input"
                            // onChange={(e) => handleChangeMission(e.target.value, "name")}
                            />
                        </div>
                    </div>

                    {/* Phone Number input */}
                    <div className="col-start-2  mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="رقم الهاتف"
                                className="first-name-input"
                            // onChange={(e) => handleChangeMission(e.target.value, "name")}
                            />
                        </div>
                    </div>
                    {/* المرحلة */}
                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                        <h3 className="last-name"> المرحلة</h3>
                    </div>
                    <div className='col-span-full pr-4'>
                        <label htmlFor="modal-8">
                            <div className="flex justify-between select-stage-container">
                                <div className="select-stage pr-4">
                                    قم بأختيار المرحلة
                                </div>
                                <div className="arrow">
                                    <img
                                        src={arrow}
                                        alt="arrow"
                                    // onClick={() => handleShowStagePopUp()}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    {/* التخصص */}
                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                        <h3 className="last-name"> التخصص</h3>
                    </div>
                    <div className='col-span-full pr-4'>
                        <label htmlFor="modal-9">
                            <div className="flex justify-between select-stage-container">
                                <div className="select-stage pr-4">
                                    قم بأختيار التخصص
                                </div>
                                <div className="arrow">
                                    <img
                                        src={arrow}
                                        alt="arrow"
                                    // onClick={() => handleShowStagePopUp()}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>

                </div>
            </div>

            <div className="add-actions mt-4 mb-4 p-5">
                <div className="grid grid-cols-2">
                    <div className="col-start-1">
                        <div className="flex gap-4">
                            <div className="add-btn"
                            //   onClick={() => handleAddNewMission()}
                            >
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

    )
}