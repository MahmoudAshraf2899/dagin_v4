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
import { WorkRange } from '../SubComponents/work-range/WorkRange';
import eye from '../../../Assets/Icons/eye.svg'
interface ApiResponse {
    id: string;
    created_at: string;
    name: string;
    national_id: string;
    specialty_id: string;
    level_id: string;
    mobile_number: string;
    email: string;
    whatsapp_number: string;
    ewallet_number: string;
    password: string;
    workAreas: {
        id: string;
        name: string;
        governorate_id: string

    }[];

}
export const EditUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showStagesPopUp, setShowStagesPopUp] = useState(false);
    const [showSpecialtiesPopUp, setShowSpecialtiesPopUp] = useState(false);
    const [showWorkRangePopUp, setShowWorkRangePopUp] = useState(false);
    const [data, setData] = useState<{}>({});
    const [selectedSpecialties, setSelectedSpecialties] = useState('قم بأختيار التخصص');
    const [selectedLevel, setSelectedLevel] = useState('قم بأختيار المرحلة');
    const stateFromUserSlice = useSelector((state: any) => state.users);

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
                            API.get(`specialties`).then((response) => {
                                if (response) {

                                    if (response.data.length > 0) {
                                        let selectedName = response.data.find((c: any) => c.id === res.data.specialty_id).name;
                                        setSelectedSpecialties(selectedName);
                                    }

                                }
                            });
                            API.get(`levels`).then((resp) => {
                                if (resp) {

                                    let selectedName = resp.data.find((item: any) => item.id === res.data.level_id).name;
                                    setSelectedLevel(selectedName);

                                }
                            });
                            setIsLoading(false);
                        }
                    }
                }
            );

        },
        []
    );
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const handleShowEditComponent = () => {
        let isVisible = false;
        let mainHeaderName = "الداش بورد";
        dispatch(setMainHeaderName({ mainHeaderName }));
        dispatch(toggleShowEditUser({ isVisible }));
    };
    const handleShowStagesPopUp = () => {
        setShowStagesPopUp(!showStagesPopUp);
    };
    const handleShowWorkRangePopup = () => {
        setShowWorkRangePopUp(!showWorkRangePopUp)
    }
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

        } else if (apiResponse?.workAreas.length === 0 && stateFromUserSlice.workAreaChanged === false) {
            toast.error("من فضلك قم بأختيار نطاق العمل");
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

        const arrayData = stateFromUserSlice.workAreaChanged === true ? stateFromUserSlice.workAreas_ids : apiResponse?.workAreas.map((item) => item.id);

        const data = {
            name: apiResponse?.name,
            mobile: apiResponse?.mobile_number,
            email: apiResponse?.email,
            whatsapp: apiResponse?.whatsapp_number,
            national_id: apiResponse?.national_id,
            specialty_id: apiResponse?.specialty_id,
            level_id: apiResponse?.level_id,
            password: apiResponse?.password,
            work_area_ids: arrayData.map((item: any) => Number(item)),
            ewallet_number: apiResponse?.ewallet_number

        };
        axios.patch(`${URL}dashboard/salesman/${stateFromUserSlice.userId}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
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
    const workRangeText =
        <div className="select-stage pr-4">
            {stateFromUserSlice.workAreaChanged === false ?
                apiResponse?.workAreas != null && apiResponse.workAreas.length > 0 ?
                    apiResponse?.workAreas.length > 1 ?
                        `${apiResponse?.workAreas[0].name} و ${apiResponse?.workAreas.length - 1} اخري` : apiResponse?.workAreas[0].name
                    : "قم بأختيار نطاق العمل"
                :

                stateFromUserSlice.workAreas_ids.length !== 0
                    ? stateFromUserSlice.workAreas_text
                    : "قم بأختيار نطاق العمل"}

        </div>;
    return (
        <div className='EditUser'>
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            {showStagesPopUp === true ? <Stages /> : null}
            {showSpecialtiesPopUp === true ? <Specialization /> : null}
            {showWorkRangePopUp === true ? <WorkRange /> : null}

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
                                        <h3 className="first-name"> اسم المستخدم</h3>
                                    </div>
                                    <div className="col-start-2 mt-4 mb-4 pr-4">
                                        <h3 className="first-name"> البريد الألكتروني </h3>
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

                                    {/*Email Input*/}
                                    <div className="col-start-2  mb-4 pr-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="البريد الألكتروني"
                                                className="first-name-input"
                                                onChange={(e) => handleChangeUser(e.target.value, "email", setValues)}
                                                value={apiResponse?.email}
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
                                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                                        <h3 className="last-name"> رقم الواتساب</h3>
                                    </div>

                                    <div className='col-start-2 mt-4 mb-4 pr-4'>
                                        <h3 className="last-name"> رقم المحفظة</h3>
                                    </div>
                                    {/* What's app number input */}
                                    <div className="col-start-1  mb-4 pr-4">
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="رقم الواتساب"
                                                className="first-name-input"

                                                value={apiResponse?.whatsapp_number}
                                                onChange={(e) => handleChangeUser(e.target.value, "whatsapp_number", setValues)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Wallet Number Input */}
                                    <div className="col-start-2  mb-4 pr-4">
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="رقم المحفظة"
                                                className="first-name-input"
                                                value={apiResponse?.ewallet_number}
                                                onChange={(e) => handleChangeUser(e.target.value, "ewallet_number", setValues)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div className='col-start-1 mb-4 pr-4'>
                                        <h3 className="first-name">كلمة المرور</h3>
                                    </div>
                                    {/* Password Input */}
                                    <div className='col-start-1   mb-4 pr-4'>

                                        <div className="form-field">
                                            <input
                                                type={showPassword === true ? "text" : "password"}
                                                className="input input-lg max-w-full first-name-input"
                                                placeholder="كلمة المرور"
                                                onChange={(e) => handleChangeUser(e.target.value, "password", setValues)}
                                                value={apiResponse?.password}

                                                id="password-user"
                                            />

                                            <span
                                                className="relative inset-y-0  inline-flex items-center"
                                                style={{ marginTop: "-40px", right: "28rem" }}
                                            >
                                                <img src={eye} alt="eye-pw"
                                                    onClick={() => togglePasswordVisibility()}
                                                />
                                            </span>
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
                                                        : selectedLevel}
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
                                                        : selectedSpecialties}
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


                                    {/* نطاق العمل */}
                                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                                        <h3 className="last-name"> نطاق العمل</h3>
                                    </div>
                                    <div className='col-span-full pr-4'>
                                        <label htmlFor="modal-784">
                                            <div className="flex justify-between select-stage-container">
                                                {workRangeText}
                                                <div className="arrow">
                                                    <img
                                                        src={arrow}
                                                        alt="arrow"
                                                        onClick={() => handleShowWorkRangePopup()}
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