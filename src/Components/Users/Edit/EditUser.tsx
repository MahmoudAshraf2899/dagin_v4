import './EditUser.scss';
import moment from "moment";
import { toast } from "react-toastify";
import API, { URL } from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { toggleShowEditUser } from '../../../redux/Slices/UsersSlice';
import { Formik, FormikHelpers } from "formik";

import { useEffect, useState } from "react";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import { Stages } from '../SubComponents/Stages/StagesPopUp';
import { Specialization } from '../SubComponents/Specialization/Specialization';
import axios from 'axios';
interface ApiResponse {
    id: string;
    created_at: string;
    name: string;
    national_id: string;
    specialty_id: string;
    level_id: string;
    mobile_number: string;
}
export const EditUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const [showStagesPopUp, setShowStagesPopUp] = useState(false);
    const [showSpecialtiesPopUp, setShowSpecialtiesPopUp] = useState(false);
    const [data, setData] = useState<{}>({});


    const dispatch = useDispatch();
    useEffect(
        () => {
            setIsLoading(true);
            let mainHeaderName = "تعديل مستخدم";
            dispatch(setMainHeaderName({ mainHeaderName }));
            API.get(`dashboard/salesman/${stateFromUserSlice.userId}`).then(
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
        if (stateFromUserSlice.specialtiesId === 0) {
            toast.error("من فضلك قم بأختيار التخصص")
            setIsLoading(false);

        } else if (stateFromUserSlice.levelId === 0) {
            toast.error("من فضلك قم بأختيار المرحلة")
            setIsLoading(false);

        } else {

            submitEditUser();
        }

    };
    const submitEditUser = () => {
        if (apiResponse != null) {

            apiResponse.specialty_id = stateFromUserSlice.specialtiesId
            apiResponse.level_id = stateFromUserSlice.levelId
        }
        const FormData = require('form-data');
        let data = new FormData();
        data.append('name', apiResponse?.name);
        data.append('mobile_number', apiResponse?.mobile_number);

        data.append('whatsapp_number', apiResponse?.mobile_number);
        data.append('national_id', apiResponse?.national_id);
        data.append('specialty_id', apiResponse?.specialty_id);
        data.append('level_id', apiResponse?.level_id);


        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${URL}dashboard/salesman/${stateFromUserSlice.userId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'multipart/form-data', // Set the Content-Type for FormData
                'Accept': 'multipart/form-data', // Set the Accept header if needed
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': URL,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("تمت تعديل المستخدم بنجاح")
                    setIsLoading(false);
                    handleShowEditComponent();
                } else if (response.status === 400) {
                    toast.error("هذا المستخدم موجود من قبل")
                    setIsLoading(false);
                }
                else {
                    toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين")
                    setIsLoading(false);
                    handleShowEditComponent();
                }
            })

    }
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
                                    <div className="col-span-full mt-4 mb-4 pr-4">
                                        <h3 className="first-name"> اسم المستخدم</h3>
                                    </div>


                                    {/*Name Input*/}
                                    <div className="col-start-1  mb-4 pr-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="اسم المستخدم"
                                                className="first-name-input"
                                                onChange={(e) => handleChangeUser(e.target.value, "name", setValues)}
                                                value={apiResponse?.name}
                                                required
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
                                                type="number"
                                                placeholder="الرقم القومي"
                                                className="first-name-input"
                                                value={apiResponse?.national_id}
                                                onChange={(e) => handleChangeUser(e.target.value, "national_id", setValues)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number input */}
                                    <div className="col-start-2  mb-4 pr-4">
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="رقم الهاتف"
                                                className="first-name-input"
                                                value={apiResponse?.mobile_number}
                                                onChange={(e) => handleChangeUser(e.target.value, "mobile_number", setValues)}
                                                required

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
                            {/* Actions */}
                            <div className="add-actions mt-4 mb-4 p-5">
                                <div className="grid grid-cols-2">
                                    <div className="col-start-1">
                                        <div className="flex gap-4">
                                            <button type="submit" className="add-btn"
                                            >
                                                تعديل
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

        </div >
    )
}