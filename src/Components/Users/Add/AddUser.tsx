import './AddUser.scss'
import moment from "moment";
import { toast } from "react-toastify";
import API, { URL } from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { setSelectedWorkAreas, toggleShowAddUser } from '../../../redux/Slices/UsersSlice';
import { useEffect, useState } from "react";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import { Stages } from '../SubComponents/Stages/StagesPopUp';
import { Specialization } from '../SubComponents/Specialization/Specialization';
import axios from 'axios';
import { WorkRange } from '../SubComponents/work-range/WorkRange';
import eye from '../../../Assets/Icons/eye.svg'
import { string } from 'yup';
const userData = {
    name: "",
    mobile: "",
    email: "",
    whatsapp: "",
    national_id: "",
    specialty_id: "",
    level_id: "",
    ewallet_number: "",
    password: ""

};
export const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const [showStagesPopUp, setShowStagesPopUp] = useState(false);
    const [showWorkRangePopUp, setShowWorkRangePopUp] = useState(false);
    const [showSpecialtiesPopUp, setShowSpecialtiesPopUp] = useState(false);

    const dispatch = useDispatch();
    const handleShowAddComponent = () => {
        let visible = false;
        let mainHeaderName = "الداش بورد";
        dispatch(setMainHeaderName({ mainHeaderName }));
        dispatch(toggleShowAddUser({ visible }));
    };
    useEffect(
        () => {
            setIsLoading(true);
            let mainHeaderName = "اضافة مستخدم";
            dispatch(setMainHeaderName({ mainHeaderName }));
            setIsLoading(false);
        },
        []
    );
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleShowStagesPopUp = () => {
        setShowStagesPopUp(!showStagesPopUp);
    };
    const handleShowWorkRangePopup = () => {
        setShowWorkRangePopUp(!showWorkRangePopUp)
    }
    const handleShowSpecialtiesPopUp = () => {
        setShowSpecialtiesPopUp(!showSpecialtiesPopUp)
    }
    const handleChangeUser = (e: any, field: string) => {
        if (field === "name") {
            userData.name = e;
        }
        else if (field === "national_id") {
            userData.national_id = e;
        } else if (field === "mobile") {
            userData.mobile = e;
        } else if (field === 'email') {
            userData.email = e;
        } else if (field === "whatsapp") {
            userData.whatsapp = e;
        } else if (field === "ewallet_number") {
            userData.ewallet_number = e;
        }
        else if (field === "password") {
            userData.password = e
        }
    };

    const handleAddUser = () => {
        /* Validations */
        setIsLoading(true);
        if (userData.name === "") {
            toast.error("من فضلك قم بأدخال الأسم ")
            setIsLoading(false);
        }
        else if (userData.national_id === "") {
            toast.error("من فضلك قم بأدخال الرقم القومي")
            setIsLoading(false);
        }
        else if (userData.mobile === "") {
            toast.error("من فضلك قم بأدخال رقم الهاتف");
            setIsLoading(false);
        } else if (stateFromUserSlice.levelId === 0) {
            toast.error("من فضلك قم بأختيار المرحلة")
            setIsLoading(false);
        } else if (stateFromUserSlice.specialtiesId === 0) {
            toast.error("من فضلك قم بأختيارالتخصص")
            setIsLoading(false);
        }
        else if (stateFromUserSlice.workAreas_ids.length === 0) {
            toast.error("من فضلك قم بأختيار نطاق العمل")
            setIsLoading(false);
        }
        else if (userData.whatsapp === "") {
            toast.error("من فضلك قم بأدخال رقم الواتساب");
            setIsLoading(false);
        }
        else if (userData.email === "") {
            toast.error("من فضلك قم بأدخال البريد الألكتروني");
            setIsLoading(false);
        }
        else if (userData.password === "") {
            toast.error("من فضلك قم بأدخال كلمة المرور");
            setIsLoading(false);
        }
        else {
            confirmAddUser();
        }
    }
    const confirmAddUser = () => {
        setIsLoading(true);

        userData.level_id = stateFromUserSlice.levelId;
        userData.specialty_id = stateFromUserSlice.specialtiesId;

        const arrayData = stateFromUserSlice.workAreas_ids;

        const data = {
            name: userData.name,
            mobile: userData.mobile,
            email: userData.email,
            whatsapp: userData.whatsapp,
            national_id: userData.national_id,
            specialty_id: userData.specialty_id,
            level_id: userData.level_id,
            password: userData.password,
            work_area_ids: arrayData.map((item: any) => Number(item)),

        };

        axios.post(`${URL}dashboard/salesman`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            if (res.status === 201) {
                toast.success("تمت اضافة المستخدم بنجاح");
                var rangeIds: string[] = new Array<string>();
                let rangeTitle = ""
                dispatch(setSelectedWorkAreas({ rangeIds, rangeTitle }));

                handleShowAddComponent();
                setIsLoading(false);
            } else if (res.status === 400) {
                toast.error("هذا المستخدم موجود من قبل")
                setIsLoading(false);
            }
            else {
                toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين")
                setIsLoading(false);
            }
        }).catch((error) => {
            toast.error("هذا المستخدم موجود من قبل")
            setIsLoading(false);
        });


    }

    return (
        <div className="AddUser">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            {showStagesPopUp === true ? <Stages /> : null}
            {showSpecialtiesPopUp === true ? <Specialization /> : null}
            {showWorkRangePopUp === true ? <WorkRange /> : null}

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
                        <h3 className="first-name">اسم المستخدم</h3>
                    </div>
                    <div className="col-start-2 mt-4 mb-4 pr-4">
                        <h3 className="first-name"> البريد الألكتروني </h3>
                    </div>


                    {/*Name Input*/}
                    <div className="col-start-1  mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="الاسم"
                                className="first-name-input"
                                onChange={(e) => handleChangeUser(e.target.value, "name")}
                            />
                        </div>
                    </div>
                    {/* Email Input */}
                    <div className="col-start-2  mb-4 pr-4">
                        <div>
                            <input
                                type="email"
                                placeholder="البريد الألكتروني"
                                className="first-name-input"
                                onChange={(e) => handleChangeUser(e.target.value, "email")}
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
                                onChange={(e) => handleChangeUser(e.target.value, "national_id")}
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
                                onChange={(e) => handleChangeUser(e.target.value, "mobile")}

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
                                onChange={(e) => handleChangeUser(e.target.value, "whatsapp")}

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
                                onChange={(e) => handleChangeUser(e.target.value, "ewallet_number")}

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
                                onChange={(e) => handleChangeUser(e.target.value, "password")}
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

                    {/* نطاق العمل */}
                    <div className='col-start-1 mt-4 mb-4 pr-4'>
                        <h3 className="last-name"> نطاق العمل</h3>
                    </div>
                    <div className='col-span-full pr-4'>
                        <label htmlFor="modal-784">
                            <div className="flex justify-between select-stage-container">
                                <div className="select-stage pr-4">
                                    {stateFromUserSlice.workAreas_ids.length !== 0
                                        ? stateFromUserSlice.workAreas_text
                                        : "قم بأختيار نطاق العمل"}
                                </div>
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
                            <div className="add-btn"
                                onClick={() => handleAddUser()}
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