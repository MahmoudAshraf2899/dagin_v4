import { useEffect } from 'react'
import './Details.scss'
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { useDispatch } from 'react-redux';
import userIcon from "../../../Assets/Icons/user.jpeg"
import attachIcon from "../../../Assets/Icons/document-text.svg"
import ellipse9 from "../../../Assets/Icons/Ellipse 9.svg"
import sponserIcon from "../../../Assets/Icons/Sponser.png"
import { toggleShowCompetitionDetails } from '../../../redux/Slices/CompetitionsSlice';
export const Details = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        let mainHeaderName = "تفاصيل المسابقة";
        dispatch(setMainHeaderName({ mainHeaderName }));
    }, [])
    const showCompetitionDetails = () => {
        let isVisible = false;
        dispatch(toggleShowCompetitionDetails({ isVisible }))
    }
    return (
        <div className="Details">
            <div className='grid grid-cols-1'>
                <div className="grid grid-cols-2 mt-4 mb-4 animate_animated animate_fadeIn mission-content">
                    <div className="col-start-1">
                        <span className="mission-type">
                            نوع المسابقة
                        </span>
                    </div>
                    <div className="col-start-2 flex gap-4 items-center justify-end">
                        <div className="popover" style={{ backgroundColor: "white" }}>
                            <svg
                                className="popover-trigger arrow"
                                tabIndex={0}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                    fill="#A7AEC1"
                                />
                                <path
                                    d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                    fill="#A7AEC1"
                                />
                                <path
                                    d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                    fill="#A7AEC1"
                                />
                            </svg>


                        </div>
                        <div>
                            <svg
                                onClick={() => showCompetitionDetails()}
                                xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 13 12" fill="none">
                                <path d="M11.4473 1.21143L1.54777 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.54688 1.21143L11.4464 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                    </div>

                    <div className="col-start-1 mb-4">
                        <span className="mission-address">عنوان المسابقة هنا</span>
                    </div>
                    <div className="col-start-2"></div>

                    <div className="col-start-1">
                        <div className="flex gap-4">
                            <div className="mission-reward">المكافاة 100 جنيه</div>
                            <div className="created-at">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                >
                                    <path
                                        d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        d="M1.875 6.125H13.125"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M5 1.75L5 3.625"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M10 1.75V3.625"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                </svg>
                                انشئت في : ٢٠ يوليو ٢٠٢٣
                            </div>

                            <div className="created-at">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                >
                                    <path
                                        d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        d="M1.875 6.125H13.125"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M5 1.75L5 3.625"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M10 1.75V3.625"
                                        stroke="#9BA0B1"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                                </svg>
                                تنتهي في : ٣٠ يوليو ٢٠٢٣
                            </div>
                        </div>
                    </div>
                    <div className="col-start-2 flex justify-end">
                        <div className="flex gap-4 mission-status">
                            <div className="inprogress">مسابقة جارية</div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className='col-start-1 mt-4'>
                        <p className='discription'>الوصف</p>
                    </div>
                    <div className='col-start-1'>
                        <p className='description-content'>
                            تقدم Analytics مبادرات قابلة للتنفيذ وجاهزة للصناعة في كل مرة يكمل فيها النشاط التجاري حسابه بالكامل. ,phasellus vitae amet amet، mauris faucibus في الجلوس. ,Rhoncus Pellentesque adipiscing a enim، quis tortor، not etiam. ,احصل على faucibus mattis consequat dui impdiet scelerisque. ,Lorem placerat blandit ut lobortis volutpat convallis libero. ,Sed impdiet dignissim ipsum quam.
                        </p>
                    </div>
                </div>

                <div className="accordion-group accordion-group-hover accordion-group-bordered mt-8">
                    <div className="accordion-group">
                        <div className="accordion">
                            <input type="checkbox" id="accordion-1" className="accordion-toggle" />
                            <label htmlFor="accordion-1" className="accordion-title  flex items-start pr-5">
                                الأسئلة
                            </label>
                            <div className="accordion-content">
                                <div className="min-h-0 grid grid-cols-1">
                                    <div className='col-start-1 mb-4'>
                                        <div className='quesion-title'>عنوان السؤال هنا</div>
                                        <div className='flex mt-4'>
                                            <div className='selected-answer'>اختيار</div>
                                            <div className='answer'>اختيار</div>
                                            <div className='answer'>اختيار</div>
                                        </div>
                                    </div>
                                    <div className='col-start-1 mb-4'>
                                        <div className='quesion-title'>عنوان السؤال هنا</div>
                                        <div className='flex mt-4'>
                                            <div className='selected-answer'>اختيار</div>
                                            <div className='answer'>اختيار</div>
                                            <div className='answer'>اختيار</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                { /*  المشاركين */}
                <div className="accordion-group accordion-group-hover accordion-group-bordered mt-8">
                    <div className="accordion-group">
                        <div className="accordion">
                            <input type="checkbox" id="accordion-2" className="accordion-toggle" />
                            <label htmlFor="accordion-2" className="accordion-title  flex items-start pr-5">
                                المشاركين
                            </label>
                            <div className="accordion-content">
                                <div className="min-h-0 grid grid-cols-2 gap-4">
                                    <div className='col-start-1 grid gap-4'>
                                        <div className='flex gap-4'>
                                            <img src={userIcon} alt="user" />
                                            <span className='userName'>أحمد محسن</span>
                                        </div>
                                        <div className='ranking content-center items-center p-4'>
                                            <div className='tag'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="57" height="76" viewBox="0 0 57 76" fill="none">
                                                    <path d="M35.4145 45.2369L24.5538 35.515L19.9073 50.1729L3.59717 46.4429L16.3347 64.9741C16.7364 65.5587 17.417 65.8101 18.0523 65.6081L44.2694 57.2638C44.9043 57.0612 45.3642 56.4467 45.43 55.7132L47.5185 32.4635L35.4145 45.2369Z" fill="#FFCD34" />
                                                    <path d="M42.7431 37.5023L41.6317 56.9222C41.59 57.6478 41.1895 58.2435 40.6209 58.4242L44.2695 57.2629C44.9048 57.0608 45.3647 56.4462 45.4304 55.7127L47.5186 32.4625L42.7431 37.5023Z" fill="#E69012" />
                                                    <path d="M23.5791 31.2756C22.3922 31.7337 21.6408 33.1169 21.9 34.364C22.1587 35.6116 23.3311 36.2504 24.5176 35.7918C25.7045 35.3336 26.4559 33.9505 26.1967 32.7034C25.938 31.4558 24.7656 30.817 23.5791 31.2756Z" fill="#FF8736" />
                                                    <path d="M46.5871 28.1824C45.4005 28.641 44.6483 30.024 44.9075 31.2712C45.1667 32.5183 46.3385 33.1576 47.5254 32.6995C48.712 32.2408 49.4642 30.8578 49.2047 29.6102C48.9455 28.363 47.7736 27.7238 46.5871 28.1824Z" fill="#FF8736" />
                                                    <path d="M2.56608 42.1941C1.37953 42.6527 0.627769 44.0353 0.886471 45.2829C1.14569 46.53 2.31787 47.1698 3.50493 46.7108C4.69147 46.2521 5.44324 44.8695 5.18402 43.6224C4.92447 42.3747 3.75262 41.7355 2.56608 42.1941Z" fill="#FF8736" />
                                                    <path d="M28.1682 49.701C26.8433 50.1224 26.177 52.0653 26.6798 54.0395C27.1836 56.0138 28.6658 57.2725 29.9908 56.8511C31.3163 56.4292 31.9826 54.4863 31.4789 52.512C30.9756 50.5373 29.4934 49.2786 28.1682 49.701Z" fill="#FA7EC1" />
                                                </svg>
                                            </div>
                                            <div className='flex  gap-4'>
                                                <h2 className='ranking-num'>المركز الأول</h2>
                                                <div className='dimaond'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M0 7.68513L12.062 7.14893L24 7.68513L12 21.6935L0 7.68513Z" fill="#FFB04C" />
                                                    <path d="M24 7.68503H0L3.83034 2.30664H20.1697L24 7.68503Z" fill="#FFDB6C" />
                                                    <path d="M20.1694 2.30664V7.68503H23.9998L20.1694 2.30664Z" fill="#FFC866" />
                                                    <path d="M20.1483 7.72176L12 21.6934L23.8953 7.80726C23.9364 7.75921 23.9024 7.68506 23.8391 7.68506H20.2122C20.1859 7.68506 20.1615 7.69903 20.1483 7.72176Z" fill="#F7A05E" />
                                                    <path d="M3.83057 2.30664H20.1699L12.0002 21.6934L3.83057 2.30664Z" fill="#FFDB6C" />
                                                    <path d="M17.9034 7.68503L20.1699 2.30664H3.83057L6.09702 7.68503H17.9034Z" fill="#FFF2BB" />
                                                    <path d="M6.09668 7.68503L11.9999 2.30664L17.9031 7.68503H6.09668Z" fill="#FFEB8A" />
                                                </svg></div>
                                                <div className='score'>
                                                    تمت بنجاح ٩٠٪
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='col-start-2 grid gap-4'>
                                        <div className='flex gap-4'>
                                            <img src={userIcon} alt="user" />
                                            <span className='userName'>أحمد محسن</span>
                                        </div>

                                        <div className='ranking content-center items-center p-4'>
                                            <div className='flex  gap-4'>
                                                <h2 className='ranking-num'>المركز الثاني</h2>
                                                <div className='dimaond'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M0 7.68513L12.062 7.14893L24 7.68513L12 21.6935L0 7.68513Z" fill="#FFB04C" />
                                                    <path d="M24 7.68503H0L3.83034 2.30664H20.1697L24 7.68503Z" fill="#FFDB6C" />
                                                    <path d="M20.1694 2.30664V7.68503H23.9998L20.1694 2.30664Z" fill="#FFC866" />
                                                    <path d="M20.1483 7.72176L12 21.6934L23.8953 7.80726C23.9364 7.75921 23.9024 7.68506 23.8391 7.68506H20.2122C20.1859 7.68506 20.1615 7.69903 20.1483 7.72176Z" fill="#F7A05E" />
                                                    <path d="M3.83057 2.30664H20.1699L12.0002 21.6934L3.83057 2.30664Z" fill="#FFDB6C" />
                                                    <path d="M17.9034 7.68503L20.1699 2.30664H3.83057L6.09702 7.68503H17.9034Z" fill="#FFF2BB" />
                                                    <path d="M6.09668 7.68503L11.9999 2.30664L17.9031 7.68503H6.09668Z" fill="#FFEB8A" />
                                                </svg></div>
                                                <div className='score'>
                                                    تمت بنجاح ٩٠٪
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* المرفقات */}
                <div className="accordion-group accordion-group-hover accordion-group-bordered mt-8">
                    <div className="accordion-group">
                        <div className="accordion">
                            <input type="checkbox" id="accordion-3" className="accordion-toggle" />
                            <label htmlFor="accordion-3" className="accordion-title  flex items-start pr-5">
                                المرفقات
                            </label>
                            <div className="accordion-content">
                                <div className="min-h-0 grid grid-cols-2 gap-4">
                                    <div className='col-start-1'>
                                        <div className='attachment flex justify-between items-center'>
                                            <div className='flex gap-4 pr-4'>
                                                <div className="img-container">
                                                    <div>
                                                        <img src={ellipse9} alt="ellipse" />
                                                    </div>
                                                    <div className="image-overlay">
                                                        <img src={attachIcon} alt="Attach" />
                                                    </div>
                                                </div>
                                                <div className='grid'>
                                                    <p className='farm-data'>بيانات المزرعة</p>
                                                    <div className='flex gap-4'>
                                                        <span className='userName'>
                                                            احمد محسن
                                                        </span>
                                                        <span className='userName'>
                                                            12 يوليو 2022
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Download Icon */}
                                            <div className='pl-4'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <g clip-path="url(#clip0_2408_26060)">
                                                        <path d="M8.0625 10.3125L12 14.25L15.9375 10.3125" stroke="#2C3659" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M12 3.75V14.25" stroke="#2C3659" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25" stroke="#2C3659" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2408_26060">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* الرعاه */}
                <div className="accordion-group accordion-group-hover accordion-group-bordered mt-8">
                    <div className="accordion-group">
                        <div className="accordion">
                            <input type="checkbox" id="accordion-4" className="accordion-toggle" />
                            <label htmlFor="accordion-4" className="accordion-title  flex items-start pr-5">
                                الرعاه
                            </label>
                            <div className="accordion-content">
                                <div className="min-h-0 grid grid-cols-5 gap-4">
                                    <div>
                                        <div className='sponser flex justify-center items-center'>
                                            <div className='grid'>
                                                <img src={sponserIcon} alt="sponser" className='sponser-icon' />
                                                <p className='sponserName'>اسم الراعي هنا</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='sponser flex justify-center items-center'>
                                            <div className='grid'>
                                                <img src={sponserIcon} alt="sponser" className='sponser-icon' />
                                                <p className='sponserName'>اسم الراعي هنا</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='sponser flex justify-center items-center'>
                                            <div className='grid'>
                                                <img src={sponserIcon} alt="sponser" className='sponser-icon' />
                                                <p className='sponserName'>اسم الراعي هنا</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}