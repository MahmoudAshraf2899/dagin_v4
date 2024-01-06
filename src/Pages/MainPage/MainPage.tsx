import { MainHeader } from "../../Components/MainHeader/MainHeader";
import { ModuleHeader } from "../../Components/ModuleHeader/ModuleHeader";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import React, { PureComponent, useEffect, useState } from "react";
import { curveCardinal } from "d3-shape";
import './MainPage.scss';
import alarm from '../../Assets/Icons/Alarm.svg';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export const MainPage = () => {
  const data = [
    {
      name: "الاحد",
      المهام: 0,
      amt: 0,
    },
    {
      name: "الاتنين",
      المهام: 3000,

      amt: 2210,
    },
    {
      name: "الثلاثاء",
      المهام: 2000,

      amt: 2290,
    },
    {
      name: "الاربعاء",
      المهام: 2780,

      amt: 2000,
    },
    {
      name: "الخميس",
      المهام: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "الجمعة",
      المهام: 2390,

      amt: 2500,
    },
    {
      name: "السبت",
      المهام: 3490,
      amt: 2100,
    },
  ];
  const listOfMonths = [
    {
      id: 1,
      name: "يناير"
    },
    {
      id: 2, name: "فبراير"
    }, {
      id: 3, name: "مارس"
    }, {
      id: 4, name: "أبريل"
    }, {
      id: 5, name: "مايو"
    }, {
      id: 6, name: "يونيو "
    }, {
      id: 7, name: "يوليو "
    }, {
      id: 8, name: "أغسطس "
    },
    {
      id: 9, name: "سبتمبر "
    }, {
      id: 10, name: "أكتوبر "
    }, {
      id: 11, name: "نوفمبر "
    }, {
      id: 12, name: "ديسمبر "
    }
  ]

  const [currentDay, setCurrentDay] = useState(1);
  const [currentMonthName, setCurrentMonthName] = useState('يناير');
  const [currentYearName, setCurrentYearName] = useState('2024');
  const [activeReportType, setActiveReportType] = useState(1);
  useEffect(() => {
    const currentDate = new Date();
    const monthOptions = { month: 'long', timeZone: 'UTC' } as Intl.DateTimeFormatOptions;
    const yearOptions = { year: 'numeric', timeZone: 'UTC' } as Intl.DateTimeFormatOptions;

    const arabicMonthName = new Intl.DateTimeFormat('ar', monthOptions).format(currentDate);
    const arabicYear = new Intl.DateTimeFormat('ar', yearOptions).format(currentDate);


    setCurrentMonthName(arabicMonthName);
    setCurrentYearName(arabicYear)
  }, []);

  const getArabicMonthName = (monthNumber: number) => {
    const currentDate = new Date();
    const monthOptions = { month: 'long', timeZone: 'UTC' } as Intl.DateTimeFormatOptions;

    // Set the month to the provided monthNumber
    currentDate.setMonth(monthNumber - 1); // JavaScript months are 0-indexed

    const arabicMonthName = new Intl.DateTimeFormat('ar', monthOptions).format(currentDate);

    return arabicMonthName;
  };

  const handleSelectedMonth = (item: number) => {
    let monthName = getArabicMonthName(item);
    setCurrentMonthName(monthName);
  }

  function getDaysInMonth(year: number, month: number) {
    // Month is 0-indexed, so January is 0, February is 1, etc.
    return new Date(year, month + 1, 0).getDate();
  }


  const handleDayClick = (day: number) => {
    setCurrentDay(day);

  };

  return (
    <div className="flex flex-row " style={{ direction: "rtl" }}>
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"

          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        {/* Side bar*/}
        <Sidebar />
      </div>
      <div className="flex w-full flex-col p-4">
        {/* Expand Button */}
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div
          className="page-container"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="col-span-12 row-span-1">
            <MainHeader />
          </div>
        </div>
        {/* Content Will Be Here */}

        <>
          <div
            className="h-full"
          >
            <div className="grid grid-cols-2 gap-4 h-full MainPage">
              <div className="bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="المهام"
                      stroke="green"
                      fill="#124734"

                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="col-start-2">
                <div className="mission-summary">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-full mb-4">
                      <p className="title">ملخص المهام</p>
                    </div>
                    <div className="col-start-1 new-type">
                      <div className="grid justify-center pt-4">
                        <div className="img-container">
                          <div >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                              <circle opacity="0.5" cx="19.9254" cy="20.5758" r="19.099" stroke="white" stroke-width="0.979434" />
                            </svg>
                          </div>
                          <div className="image-overlay">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                              <g clip-path="url(#clip0_1692_2507)">
                                <path d="M12.0966 11.7983C13.8596 12.1764 15.5953 11.0538 15.9734 9.29079C16.3515 7.52779 15.2289 5.79207 13.4659 5.41395C11.7029 5.03584 9.96716 6.1585 9.58904 7.9215C9.21092 9.68449 10.3336 11.4202 12.0966 11.7983Z" stroke="white" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.99551 18.8374C7.7585 19.2155 9.49422 18.0928 9.87234 16.3298C10.2505 14.5669 9.12779 12.8311 7.3648 12.453C5.6018 12.0749 3.86608 13.1976 3.48796 14.9606C3.10984 16.7236 4.23251 18.4593 5.99551 18.8374Z" stroke="white" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.7741 20.7202C16.5371 21.0983 18.2728 19.9757 18.6509 18.2127C19.029 16.4497 17.9064 14.7139 16.1434 14.3358C14.3804 13.9577 12.6446 15.0804 12.2665 16.8434C11.8884 18.6064 13.0111 20.3421 14.7741 20.7202Z" stroke="white" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1692_2507">
                                  <rect width="19.5887" height="19.5887" fill="white" transform="translate(4.40283 0.965881) rotate(12.1051)" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>

                        </div>

                        <span className="status-txt mt-4">جديدة</span>
                        <span className="status-count">40</span>

                      </div>
                    </div>
                    <div className="col-start-2 inProgress">
                      <div className="grid justify-center pt-4">
                        <div className="img-container-progress mr-1">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                              <circle opacity="0.5" cx="19.9615" cy="20.5758" r="19.099" stroke="#124734" stroke-width="0.979434" />
                            </svg>
                          </div>
                          <div className="image-overlay-progress">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                              <path d="M7.49232 9.7596C9.29541 9.7596 10.7571 8.29791 10.7571 6.49482C10.7571 4.69173 9.29541 3.23004 7.49232 3.23004C5.68923 3.23004 4.22754 4.69173 4.22754 6.49482C4.22754 8.29791 5.68923 9.7596 7.49232 9.7596Z" stroke="#124734" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M2.59521 17.9216V16.2892C2.59521 15.4233 2.93918 14.5929 3.55145 13.9806C4.16371 13.3684 4.99412 13.0244 5.86 13.0244H9.12478C9.99065 13.0244 10.8211 13.3684 11.4333 13.9806C12.0456 14.5929 12.3896 15.4233 12.3896 16.2892V17.9216" stroke="#124734" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M13.2056 9.75959L14.838 11.392L18.1027 8.1272" stroke="#124734" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>

                        </div>

                        <span className="status-txt-progress mt-4">قيد التنفيذ</span>
                        <span className="status-count-progress">79</span>

                      </div>
                    </div>
                    <div className="col-start-3 evaluation">
                      <div className="grid justify-center pt-4">
                        <div className="img-container-evaluation mr-1">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                              <circle opacity="0.5" cx="20.0179" cy="20.5758" r="19.099" stroke="#124734" stroke-opacity="0.203922" stroke-width="0.979434" />
                            </svg>
                          </div>
                          <div className="image-overlay-evaluation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84852 1.53613H4.18804C2.21546 1.53613 0.97876 2.93281 0.97876 4.9093V10.2427C0.97876 12.2191 2.20958 13.6158 4.18804 13.6158H9.84786C11.827 13.6158 13.0585 12.2191 13.0585 10.2427V4.9093C13.0585 2.93281 11.827 1.53613 9.84852 1.53613Z" stroke="#124734" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M4.6936 7.57595L6.24372 9.12542L9.34265 6.02649" stroke="#124734" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>

                        </div>

                        <span className="status-txt-evaluation mt-4">التقييم</span>
                        <span className="status-count-evaluation">89</span>

                      </div>
                    </div>
                    <div className="col-start-4 completed">
                      <div className="grid justify-center pt-4">
                        <div className="img-container-completed mr-1">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                              <circle opacity="0.5" cx="20.0745" cy="20.5758" r="19.099" stroke="white" stroke-width="0.979434" />
                            </svg>
                          </div>
                          <div className="image-overlay-completed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.90491 1.53613H4.24444C2.27186 1.53613 1.03516 2.93281 1.03516 4.9093V10.2427C1.03516 12.2191 2.26598 13.6158 4.24444 13.6158H9.90426C11.8834 13.6158 13.1148 12.2191 13.1148 10.2427V4.9093C13.1148 2.93281 11.8834 1.53613 9.90491 1.53613Z" stroke="white" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M4.75 7.57595L6.30012 9.12542L9.39905 6.02649" stroke="white" stroke-width="1.46915" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>

                        </div>

                        <span className="status-txt-completed mt-4">تامة</span>
                        <span className="status-count-completed">79</span>

                      </div>
                    </div>

                    <div className="col-span-full">
                      <span className="balance">معدل الإنجاز في الوقت المحدد</span>
                    </div>
                    <div className="col-span-full">
                      <div className="flex items-baseline gap-2">
                        <h1 className="percentage">95%</h1>
                        <span className="increase">+2,5%</span>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
              { /* Month Picker */}
              <div className="col-start-1">
                <div className="flex justify-start">
                  <div className="dropdown-container justify-center">
                    <div className="dropdown" style={{ textAlign: "right" }}>
                      <label className="monthYearLabel" tabIndex={0}>{currentMonthName} {currentYearName} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path d="M14.9401 7.21249L10.0501 12.1025C9.47256 12.68 8.52756 12.68 7.95006 12.1025L3.06006 7.21249" stroke="#2C3659" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg></label>
                      <div className="dropdown-menu dropdown-menu-bottom-center-customize">
                        {listOfMonths.map((item) => {
                          return (
                            <button className="dropdown-item text-lg"
                              tabIndex={-1}
                              onClick={(e) => handleSelectedMonth(Number(item.id))}>
                              {item.name}
                            </button>
                          )
                        })}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">

                <div className="month-slider">

                  {Array.from({ length: 31 }, (_, index) => {
                    const day = index + 1;
                    const isActive = day === currentDay;
                    const classNames = isActive ? 'day active' : 'day';

                    return (
                      <div key={day} className={classNames} onClick={() => handleDayClick(day)}>
                        {day}
                      </div>
                    );
                  })}
                </div>

              </div>
              {/*  Report Type */}
              <div className="col-span-full">
                <div className="flex gap-6">
                  <div
                    className={activeReportType === 1 ? "report-type-active" : "report-type"}
                    onClick={() => setActiveReportType(1)}>
                    المهام
                  </div>
                  <div
                    className={activeReportType === 2 ? "report-type-active" : "report-type"}
                    onClick={() => setActiveReportType(2)}
                  >المسابقات
                  </div>
                  <div
                    className={activeReportType === 3 ? "report-type-active" : "report-type"}
                    onClick={() => setActiveReportType(3)}
                  >الاختبارات
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <div className="flex justify-between">
                  <h1 className="currentMissions">مهام اليوم</h1>
                  <h1 className="showAll pl-4">عرض الكل</h1>
                </div>
              </div>
              <div className="col-span-full">
                <div className="grid grid-cols-2 mb-4 animate_animated animate_fadeIn mission-content">

                  <div className="col-start-1">
                    <span className="mission-type">
                      مهمة تسكين مزرعة
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
                    <span className="mission-address"> مهمة اضافة مزرعة في الجيزة</span>
                  </div>
                  <div className="col-start-2"></div>

                  <div className="col-start-1">
                    <div className="flex gap-4">
                      <div className="mission-reward">السعر 100 جنيه</div>
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
                        تنتهي في : ٢٠ يوليو ٢٠٢٣
                      </div>
                    </div>
                  </div>
                  <div className="col-start-2 flex justify-end">
                    <div className="flex gap-4 mission-status">
                      <div className="inprogress">قيد الأنتظار</div>
                      <div className="not-assigned-yet">لم تستند بعد</div>
                    </div>
                  </div>

                  <div className="col-start-1">
                    <div className="mission-history">
                      اخر تعديل تم بواسطة : Mahmoud ELnabwy
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </>
      </div>
    </div>
  );
};
