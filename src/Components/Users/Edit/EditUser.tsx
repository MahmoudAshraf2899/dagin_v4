import './EditUser.scss';
import moment from "moment";
import { toast } from "react-toastify";
import API from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { toggleShowEditUser } from '../../../redux/Slices/UsersSlice';
import { Formik, FormikHelpers } from "formik";

import { useEffect, useState } from "react";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import { Stages } from '../SubComponents/Stages/StagesPopUp';
import { Specialization } from '../SubComponents/Specialization/Specialization';

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
export const EditUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const [showStagesPopUp, setShowStagesPopUp] = useState(false);
    const [showSpecialtiesPopUp, setShowSpecialtiesPopUp] = useState(false);
    const dispatch = useDispatch();
    useEffect(
        () => {
            let mainHeaderName = "تعديل مستخدم";
            dispatch(setMainHeaderName({ mainHeaderName }));
        },
        []
    );
    const handleShowEditComponent = () => {
        let visible = false;
        let mainHeaderName = "الداش بورد";
        dispatch(setMainHeaderName({ mainHeaderName }));
        dispatch(toggleShowEditUser({ visible }));
    };
    const handleShowStagesPopUp = () => {
        setShowStagesPopUp(!showStagesPopUp);
    };
    const handleShowSpecialtiesPopUp = () => {
        setShowSpecialtiesPopUp(!showSpecialtiesPopUp)
    }
    const handleChangeUser = (
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
    const handleEditUser = () => {
        setIsLoading(true);

    };
    return (
        <div className='EditUser'>
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            {showStagesPopUp === true ? <Stages /> : null}
            {showSpecialtiesPopUp === true ? <Specialization /> : null}
            <Formik
                onSubmit={() => handleEditUser()}
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
                                                    {stateFromUserSlice.levelId !== 0
                                                        ? stateFromUserSlice.levelName
                                                        : "قم بأختيار المرحلة"}
                                                </div>
                                                <div className="arrow">
                                                    <img
                                                        src={arrow}
                                                        alt="arrow"
                                                        onClick={() => handleShowStagesPopUp()}
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
                                                    {stateFromUserSlice.specialtiesId !== 0
                                                        ? stateFromUserSlice.specialtiesName
                                                        : "قم بأختيار التخصص"}
                                                </div>
                                                <div className="arrow">
                                                    <img
                                                        src={arrow}
                                                        alt="arrow"
                                                        onClick={() => handleShowSpecialtiesPopUp()}
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

        </div >
    )
}