import './PerosnalData.scss'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import arrow from "../../../../Assets/Icons/arrow.jpeg"
import eye from "../../../../Assets/Icons/eye.svg"
import API from '../../../../Api';
import moment from "moment";
import { toast } from "react-toastify";
import { Loading } from '../../../Loading/Loading';
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
export const PersonalData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [data, setData] = useState<{}>({});
    const [selectedSpecialties, setSelectedSpecialties] = useState('قم بأختيار التخصص');
    const [selectedLevel, setSelectedLevel] = useState('قم بأختيار المرحلة');
    const dispatch = useDispatch();
    const stateFromUserSlice = useSelector((state: any) => state.users);

    useEffect(
        () => {
            setIsLoading(true);
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
    return (
        <div className="PerosnalData">
            {isLoading === true ? <Loading /> : null}
            <div className='grid grid-cols-2'>
                {/* البيانات الشخصية */}
                <div className='col-span-full mt-8'>
                    <div className='flex justify-between'>
                        <h3 className='title'>البيانات الشخصية</h3>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 12V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H12M15.6864 4.02275C15.6864 4.02275 15.6864 5.45305 17.1167 6.88334C18.547 8.31364 19.9773 8.31364 19.9773 8.31364M9.15467 15.9896L12.1583 15.5605C12.5916 15.4986 12.9931 15.2978 13.3025 14.9884L21.4076 6.88334C22.1975 6.09341 22.1975 4.81268 21.4076 4.02275L19.9773 2.59245C19.1873 1.80252 17.9066 1.80252 17.1167 2.59245L9.01164 10.6975C8.70217 11.0069 8.50142 11.4084 8.43952 11.8417L8.01044 14.8453C7.91508 15.5128 8.4872 16.0849 9.15467 15.9896Z" stroke="#28303F" stroke-width="1.5" stroke-linecap="round" />
                            </svg></div>
                    </div>
                </div>
                {/* الاسم الاول */}
                <div className="col-start-1 mb-4 pr-4 mt-8">
                    <h3 className="first-name"> اسم المستخدم</h3>
                </div>
                <div className="col-start-2 mb-4 pr-4 mt-8">
                    <h3 className="first-name"> البريد الألكتروني </h3>
                </div>
                {/*Name Input*/}
                <div className="col-start-1  mb-4 pr-4">
                    <div>
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            className="first-name-input"
                            readOnly
                            value={apiResponse?.name}

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
                            disabled={true}
                            value={apiResponse?.email}
                            readOnly

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
                            readOnly
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
                            readOnly

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
                            readOnly
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
                            readOnly
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
                            type="text"
                            className="input input-lg max-w-full first-name-input"
                            placeholder="كلمة المرور"
                            value={apiResponse?.password}
                            readOnly
                            id="password-user"
                        />

                        <span
                            className="relative inset-y-0  inline-flex items-center"
                            style={{ marginTop: "-40px", right: "28rem" }}
                        >
                            <img src={eye} alt="eye-pw"

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

                                {selectedSpecialties}
                            </div>
                            <div className="arrow">
                                <img
                                    src={arrow}
                                    alt="arrow"
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
                                {selectedLevel}
                            </div>
                            <div className="arrow">
                                <img
                                    src={arrow}
                                    alt="arrow"
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

                                {apiResponse?.workAreas != null && apiResponse.workAreas.length > 0 ?
                                    apiResponse?.workAreas.length > 1 ?
                                        `${apiResponse?.workAreas[0].name} و ${apiResponse?.workAreas.length - 1} اخري` : apiResponse?.workAreas[0].name
                                    : "قم بأختيار نطاق العمل"}
                            </div>
                            <div className="arrow">
                                <img
                                    src={arrow}
                                    alt="arrow"
                                />
                            </div>
                        </div>
                    </label>
                </div>


            </div>
        </div>
    )
}