import './Exams.scss'
export const Exams = () => {
    return (
        <div className='Exams'>
            <div className='grid grid-cols-2 mt-10 pr-10'>
                <div className='col-span-full'>
                    <h3 className='title'>الأختبارات</h3>
                </div>
            </div>

            <div className='exam-container'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-full'>
                        <div className='flex justify-between'>
                            <div className='grid'>
                                <div className='course-name'>اسم الكورس التابع له الاختبار هنا</div>
                                <div className='exam-address'>عنوان الأختبار</div>
                                <div className="finished-at">

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
                                    تم الانتهاء في : ٢٠ يوليو ٢٠٢٣
                                </div>
                            </div>
                            <div className='status'>
                                لم تنجح ٢٠٪
                            </div>
                        </div>
                    </div>
                    <div className='col-span-full'>
                        <div className="divider"></div>
                    </div>
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
            <div className='exam-container'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-full'>
                        <div className='flex justify-between'>
                            <div className='grid'>
                                <div className='course-name'>اسم الكورس التابع له الاختبار هنا</div>
                                <div className='exam-address'>عنوان الأختبار</div>
                                <div className="finished-at">

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
                                    تم الانتهاء في : ٢٠ يوليو ٢٠٢٣
                                </div>
                            </div>
                            <div className='status'>
                                لم تنجح ٢٠٪
                            </div>
                        </div>
                    </div>
                    <div className='col-span-full'>
                        <div className="divider"></div>
                    </div>
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
    )
}