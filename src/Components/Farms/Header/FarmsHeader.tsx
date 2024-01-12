import './FarmsHeader.scss'
export const FarmsHeader = () => {
    return (

        <div className="grid grid-cols-2 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4  FarmsHeader">

            <div className="col-start-1 flex  sm:col-start-1">
                <div
                    // onClick={() => handleActiveElement(1)}
                    className={
                        "main-element-active"
                        //   activeElement === 1 ? "main-element-active" : "main-element"
                    }
                >
                    العنابر
                </div>
                <div
                    // onClick={() => handleActiveElement(2)}
                    className={
                        "main-element"
                        // activeElement === 2 ? "main-element-active" : "main-element"
                    }
                >
                    العنابر / المربيين
                </div>


            </div>
            <div className="col-start-2  flex justify-end">
                <div className="flex">

                    {/* Filter Button */}
                    <div className="filter-section flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M4.58342 4.16669H15.4168C15.5368 4.20878 15.6456 4.27778 15.7348 4.36841C15.824 4.45903 15.8913 4.56888 15.9315 4.68954C15.9718 4.81019 15.9838 4.93845 15.9668 5.06449C15.9498 5.19053 15.9042 5.31101 15.8334 5.41669L11.6668 10V15.8334L8.33342 13.3334V10L4.16676 5.41669C4.096 5.31101 4.05037 5.19053 4.03336 5.06449C4.01636 4.93845 4.02842 4.81019 4.06864 4.68954C4.10886 4.56888 4.17616 4.45903 4.26539 4.36841C4.35462 4.27778 4.46341 4.20878 4.58342 4.16669Z"
                                stroke="#64748B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        الفلتر
                    </div>
                </div>
            </div>

        </div>

    )
}