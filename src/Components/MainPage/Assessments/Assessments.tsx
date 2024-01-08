import './Assessments.scss'
export const Assessments = () => {
    return (
        <div className='col-span-full Assessments'>
            <div className="grid grid-cols-2 mb-4 animate_animated animate_fadeIn mission-content">

                <div className="col-start-1">
                    <span className="mission-type">
                        نوع الأختبار
                    </span>
                </div>
                <div className="col-start-2 flex justify-end">
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
                </div>

                <div className="col-start-1">
                    <span className="mission-address"> عنوان الأختبار  هنا</span>
                </div>
                <div className="col-start-2"></div>

                <div className="col-start-1">
                    <div className="flex gap-4">
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


                    </div>
                </div>
            </div>
        </div>
    )
}