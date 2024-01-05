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
  const cardinal = curveCardinal.tension(0.2);
  const [currentDay, setCurrentDay] = useState(1);
  useEffect(() => {
    // Center the slider on the current day when the component mounts
    const centerSlide = Math.max(0, currentDay - 4); // Adjust the number based on your desired visible range
    setCurrentDay(centerSlide);
  }, [currentDay]);



  const handlePrevClick = () => {
    setCurrentDay((prevDay) => Math.max(1, prevDay - 1));
  };

  const handleNextClick = () => {
    setCurrentDay((prevDay) => Math.min(31, prevDay + 1));
  };

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
    // Add any other logic you want to perform when a day is clicked
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
                <ResponsiveContainer width="100%" height="50%">
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

              {/* <div className="col-span-full">
                <div className="arrow left" onClick={() => handlePrevClick()}>{'<'}</div>
                <div className="month-slider">
                  <div className="slider-container">
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
                <div className="arrow right" onClick={() => handleNextClick()}>{'>'}</div>
              </div> */}
            </div>


          </div>
        </>
      </div>
    </div>
  );
};
