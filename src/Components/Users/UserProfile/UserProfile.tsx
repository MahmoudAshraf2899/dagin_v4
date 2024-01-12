import './UserProfile.scss'
import userIcon from "../../../Assets/Icons/40px.svg";
import { useEffect, useState } from 'react';
import { PersonalData } from './PersonalData/PersonalData';
import { useDispatch, useSelector } from 'react-redux';
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { Loading } from '../../Loading/Loading';
import { CurrentEvaluation } from './CurrentEvaluation/CurrentEvaluation';
import { MissionHistory } from './MissionHistory/MissionHistory';
import { AccountStatement } from './AccountStatement/AccountStatement';
import { Courses } from './Courses/Courses';
import { Exams } from './Exams/Exams';
import { Competions } from './Competions/Competions';
import { Notes } from './Notes/Notes';
import moment from "moment";
import "moment/locale/ar"; // Import the Arabic locale
import { ar, enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
export const UserProfile = () => {
    const [isActive, setIsActive] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stateFromUserSlice = useSelector((state: any) => state.users);

    useEffect(() => {
        setIsLoading(true);
        moment.locale("ar");
        let mainHeaderName = "صفحة المستخدم";
        dispatch(setMainHeaderName({ mainHeaderName }));
        setIsLoading(false);
    }, []);
    const handleSelectActiveElement = (id: number) => {
        setIsLoading(true);
        setIsActive(id)
        setIsLoading(false);
    }
    const handleShowUserProfile = () => {
        navigate(-1);
    }
    return (
        <div className="UserProfile grid-cols-1 pt-10">
            {isLoading === true ?
                <Loading /> : null}
            <div className='card-container'>
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-4'>
                        <div><img src={userIcon} alt="User Icon" /></div>
                        <div className=''>
                            <h3 className='user-name'>{stateFromUserSlice.userName}</h3>
                            <span className='flex position-type gap-4'>
                                حديث التخرج
                                <span className='user-status'>عضو  منذ {moment(stateFromUserSlice.creationDate).format("YYYY/MM/DD")} </span>
                            </span>
                        </div>
                    </div>

                    <div className='flex gap-8 items-center'>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3" stroke="#EB001B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg
                            onClick={() => handleShowUserProfile()}
                            xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 13 12" fill="none">
                            <path d="M11.4473 1.21143L1.54777 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.54688 1.21143L11.4464 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className='flex w-full'>
                    <div
                        className={isActive === 1 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(1)}
                    >
                        البيانات الشخصية
                    </div>
                    <div
                        className={isActive === 2 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(2)}
                    >
                        التقييم الحالي
                    </div>
                    <div
                        className={isActive === 3 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(3)}
                    >
                        سجل المهمات
                    </div>

                    <div
                        className={isActive === 4 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(4)}
                    >
                        المحفظة
                    </div>
                    <div
                        className={isActive === 5 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(5)}
                    >الكورسات</div>
                    <div
                        className={isActive === 6 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(6)}
                    >الأختبارات
                    </div>
                    <div
                        className={isActive === 7 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(7)}
                    >المسابقات</div>
                    <div
                        className={isActive === 8 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(8)}
                    >الشهادات</div>
                    <div
                        className={isActive === 9 ? "menu-element-active" : "menu-element"}
                        onClick={() => handleSelectActiveElement(9)}
                    >ملاحظات</div>
                </div>
            </div>
            <div>
                {isActive === 1 ? <PersonalData /> : isActive === 2 ? <CurrentEvaluation /> : isActive === 3 ? <MissionHistory /> : isActive === 4 ? <AccountStatement /> : isActive === 5 ? <Courses /> : isActive === 6 ? <Exams /> : isActive === 7 ?
                    <Competions /> : isActive === 9 ? <Notes /> : null}
            </div>

        </div>
    )
}