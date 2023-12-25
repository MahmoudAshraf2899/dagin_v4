import './AddUser.scss'
import moment from "moment";
import { toast } from "react-toastify";
import API, { URL } from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { toggleShowAddUser } from '../../../redux/Slices/UsersSlice';
import { useEffect, useState } from "react";
import arrow from "../../../Assets/Icons/arrow.jpeg";
import { Stages } from '../SubComponents/Stages/StagesPopUp';
import { Specialization } from '../SubComponents/Specialization/Specialization';
import axios from 'axios';
const userData = {
    name: "",
    mobile: "",
    email: "",
    national_id: "",
    specialty_id: "",
    level_id: "",

};
export const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const [showStagesPopUp, setShowStagesPopUp] = useState(false);
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

    const handleShowStagesPopUp = () => {
        setShowStagesPopUp(!showStagesPopUp);
    };
    const handleShowSpecialtiesPopUp = () => {
        setShowSpecialtiesPopUp(!showSpecialtiesPopUp)
    }
    const handleChangeUser = (e: any, field: string) => {
        if (field === "firstName") {
            setFirstName(e);

        } else if (field === "lastName") {
            setLastName(e);
        }
        else if (field === "national_id") {
            userData.national_id = e;
        } else if (field === "mobile") {
            userData.mobile = e;
        }
    };

    const handleAddUser = () => {
        /* Validations */
        setIsLoading(true);
        if (firstName === "") {
            toast.error("من فضلك قم بأدخال الأسم الأول")
            setIsLoading(false);

        } else if (lastName === "") {
            toast.error("من فضلك قم بأدخال الأسم الأخير")
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
        } else {
            confirmAddUser();
        }

    }
    const confirmAddUser = () => {
        setIsLoading(true);

        userData.level_id = stateFromUserSlice.levelId;
        userData.specialty_id = stateFromUserSlice.specialtiesId;

        const FormData = require('form-data');
        let data = new FormData();
        data.append('name', `${firstName}-${lastName}`);
        data.append('mobile', userData.mobile);

        data.append('whatsapp', userData.mobile);
        data.append('national_id', userData.national_id);
        data.append('specialty_id', userData.specialty_id);
        data.append('level_id', userData.level_id);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://dajintest.environ-adapt.tk/dashboard/salesman',
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
                if (response.status === 201) {
                    toast.success("تمت اضافة المستخدم بنجاح")
                    setIsLoading(false);
                } else if (response.status === 400) {
                    toast.error("هذا المستخدم موجود من قبل")
                    setIsLoading(false);
                }
                else {
                    toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين")
                    setIsLoading(false);
                }
            })
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
                                onChange={(e) => handleChangeUser(e.target.value, "firstName")}
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
                                onChange={(e) => handleChangeUser(e.target.value, "lastName")}

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