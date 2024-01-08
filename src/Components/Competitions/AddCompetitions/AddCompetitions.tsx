import { useDispatch } from 'react-redux';
import './AddCompetitions.scss'
import { useEffect, useState } from 'react';
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
import { Loading } from '../../Loading/Loading';
import { DatePickerComponent } from '../../Missions/AddMission/SubComponents/DatePicker/DatePickerComponent';
import arrow from "../../../Assets/Icons/arrow.jpeg"


interface Choice {
    c_Id: number;
    q_Id: number;
    c_title: string;
    c_IsCorrect: boolean;
}

interface Question {
    q_Id: number;
    q_title: string;
    q_mark: number;
    choices: Choice[];
}

export const AddCompetitions = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState<Choice[]>([]);


    const [questions, setQuestions] = useState<Question[]>([
        {
            q_Id: 1,
            q_title: "What is your question?",
            q_mark: 10,
            choices: [
                { c_Id: 1, q_Id: 1, c_title: "Choice 1", c_IsCorrect: true },
                { c_Id: 2, q_Id: 1, c_title: "Choice 2", c_IsCorrect: false },
                // Add more choices as needed
            ],
        },
        // Add more objects as needed
    ]);



    useEffect(
        () => {
            let mainHeaderName = "اضافة مسابقة جديدة";
            dispatch(setMainHeaderName({ mainHeaderName }));
            let firstObj = questions.find(c => c.q_Id === 1);
            if (firstObj != null) {
                let choises = firstObj.choices
                setFirstQuestion(choises)
            }


        }, [firstQuestion, questions]);

    const addQuestion = () => {
        const newQuestion: Question = {
            // q_Id: questions.length + 1,
            q_Id: 1,
            q_title: "New Question",
            q_mark: 5,
            choices: [
                { c_Id: 1, q_Id: 1, c_title: "New Choice 1", c_IsCorrect: false },
                { c_Id: 2, q_Id: 1, c_title: "New Choice 2", c_IsCorrect: true },
                // Add more choices as needed
            ],
        };
        // Update the state by adding the new question
        setQuestions([...questions, newQuestion]);
    };
    const addChoise = (qId: number) => {
        const questionChoiseObj = questions.find(c => c.q_Id === qId)?.choices;
        const newChoise: Choice = {
            c_Id: 3, q_Id: qId, c_title: "", c_IsCorrect: false
        }
        firstQuestion.push(newChoise);


        setFirstQuestion([...firstQuestion, newChoise]);


    }
    function getArabicRanking(number: number): string {
        const arabicRankings = [
            'الأول',
            'الثاني',
            'الثالث',
            'الرابع',
            'الخامس',
            'السادس',
            'السابع',
            'الثامن',
            'التاسع',
            'العاشر',
        ];

        if (number >= 1 && number <= arabicRankings.length) {
            return arabicRankings[number - 1];
        } else {
            return 'غير معروف'; // Return this for out-of-range numbers
        }
    }
    // const firstQuestion = questions.find(c => c.q_Id === 1);
    return (
        <div className="AddCompetitions">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}

            {/* First Section [Competition Details] */}
            <div className="add-section mb-4">
                <div className="grid grid-cols-2">
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h2 className="flex justify-start mission-details">
                            تفاصيل المهمة
                        </h2>
                    </div>
                    <div className="col-span-full mb-4">
                        <div className="divider"></div>
                    </div>
                    {/* نوع المسابقة */}
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h3 className="mission-type"> نوع المسابقة</h3>
                    </div>
                    <div className="col-span-full pr-4">
                        <label htmlFor="modal-8">
                            <div className="flex justify-between select-mission-container">
                                <div className="select-mission-type pr-4">
                                    اختر نوع المسابقة
                                </div>
                                <div className="arrow">
                                    <img
                                        src={arrow}
                                        alt="arrow"
                                    // onClick={() => handleShowTypePopUp()}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="col-start-1 mt-4  pr-4">
                        <h3 className="mission-type"> عنوان المسابقة</h3>
                    </div>
                    <div className="col-start-2 mt-4  pr-4">
                        <h3 className="mission-type"> تاريخ الأنتهاء</h3>
                    </div>

                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <div>
                            <input
                                type="text"
                                placeholder="اكتب عنوان هنا"
                                className="mission-address-input"
                            // onChange={(e) => handleChangeMission(e.target.value, "name")}
                            />
                        </div>
                    </div>
                    <div className="col-start-2 mt-4 mb-4 pl-4">
                        <DatePickerComponent activation={false} isEdit={false} />
                    </div>
                    {/* تفاصيل المسابقة */}
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h3 className="mission-type"> تفاصيل المسابقة</h3>
                    </div>
                    <div className="col-span-full pr-4 pl-4">
                        <div className="txt-area">
                            <textarea
                                style={{ width: "100%" }}
                                className="mission-text-area"
                                placeholder="تفاصيل المسابقة"
                            // onChange={(e) => handleChangeMission(e.target.value, "details")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section [Competiton Questions] */}
            <div className='add-section mb-4'>
                <div className="grid grid-cols-2">
                    <div className="col-span-full mt-4 mb-4 pr-4">
                        <div className='flex justify-between pl-4'>

                            <h2 className="flex justify-start question-head">
                                اسئلة الاختبار
                            </h2>
                            <div className='add-question flex gap-2 items-center justify-center'>
                                <span>
                                    اضافة سؤال

                                </span>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <g clip-path="url(#clip0_2408_23312)">
                                            <path d="M12 0.75C9.62663 0.75 7.30655 1.45379 5.33316 2.77236C3.35977 4.09094 1.8217 5.96509 0.913451 8.1578C0.00519943 10.3505 -0.232441 12.7633 0.230582 15.0911C0.693605 17.4189 1.83649 19.5571 3.51472 21.2353C5.19295 22.9135 7.33115 24.0564 9.65892 24.5194C11.9867 24.9824 14.3995 24.7448 16.5922 23.8366C18.7849 22.9283 20.6591 21.3902 21.9776 19.4168C23.2962 17.4435 24 15.1234 24 12.75C23.9966 9.56846 22.7312 6.51821 20.4815 4.26852C18.2318 2.01883 15.1815 0.753441 12 0.75ZM12 22.75C10.0222 22.75 8.08879 22.1635 6.4443 21.0647C4.79981 19.9659 3.51809 18.4041 2.76121 16.5768C2.00433 14.7496 1.8063 12.7389 2.19215 10.7991C2.578 8.85929 3.53041 7.07746 4.92894 5.67893C6.32746 4.28041 8.10929 3.328 10.0491 2.94215C11.9889 2.5563 13.9996 2.75433 15.8268 3.5112C17.6541 4.26808 19.2159 5.54981 20.3147 7.1943C21.4135 8.83879 22 10.7722 22 12.75C21.9971 15.4013 20.9426 17.9431 19.0679 19.8179C17.1931 21.6926 14.6513 22.7471 12 22.75ZM17 12.75C17 13.0152 16.8946 13.2696 16.7071 13.4571C16.5196 13.6446 16.2652 13.75 16 13.75H13V16.75C13 17.0152 12.8946 17.2696 12.7071 17.4571C12.5196 17.6446 12.2652 17.75 12 17.75C11.7348 17.75 11.4804 17.6446 11.2929 17.4571C11.1054 17.2696 11 17.0152 11 16.75V13.75H8.00001C7.73479 13.75 7.48043 13.6446 7.2929 13.4571C7.10536 13.2696 7.00001 13.0152 7.00001 12.75C7.00001 12.4848 7.10536 12.2304 7.2929 12.0429C7.48043 11.8554 7.73479 11.75 8.00001 11.75H11V8.75C11 8.48478 11.1054 8.23043 11.2929 8.04289C11.4804 7.85536 11.7348 7.75 12 7.75C12.2652 7.75 12.5196 7.85536 12.7071 8.04289C12.8946 8.23043 13 8.48478 13 8.75V11.75H16C16.2652 11.75 16.5196 11.8554 16.7071 12.0429C16.8946 12.2304 17 12.4848 17 12.75Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2408_23312">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.75)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <div className="divider"></div>
                    </div>

                    <div className='col-span-full questions-section'>

                        <div className='grid grid-cols-2 mt-4 mb-4 pr-4  '>
                            <div className='col-span-full flex  justify-between pl-4'>
                                {/* رقم السؤال */}
                                <h2 className="flex justify-start question-number">
                                    السؤال الأول
                                </h2>
                                {/* اضافة اختيار */}
                                <div className='add-question flex gap-2 items-center justify-center'
                                    onClick={() => addChoise(1)}>
                                    <span>
                                        اضافة اختيار
                                    </span>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <g clip-path="url(#clip0_2408_23312)">
                                                <path d="M12 0.75C9.62663 0.75 7.30655 1.45379 5.33316 2.77236C3.35977 4.09094 1.8217 5.96509 0.913451 8.1578C0.00519943 10.3505 -0.232441 12.7633 0.230582 15.0911C0.693605 17.4189 1.83649 19.5571 3.51472 21.2353C5.19295 22.9135 7.33115 24.0564 9.65892 24.5194C11.9867 24.9824 14.3995 24.7448 16.5922 23.8366C18.7849 22.9283 20.6591 21.3902 21.9776 19.4168C23.2962 17.4435 24 15.1234 24 12.75C23.9966 9.56846 22.7312 6.51821 20.4815 4.26852C18.2318 2.01883 15.1815 0.753441 12 0.75ZM12 22.75C10.0222 22.75 8.08879 22.1635 6.4443 21.0647C4.79981 19.9659 3.51809 18.4041 2.76121 16.5768C2.00433 14.7496 1.8063 12.7389 2.19215 10.7991C2.578 8.85929 3.53041 7.07746 4.92894 5.67893C6.32746 4.28041 8.10929 3.328 10.0491 2.94215C11.9889 2.5563 13.9996 2.75433 15.8268 3.5112C17.6541 4.26808 19.2159 5.54981 20.3147 7.1943C21.4135 8.83879 22 10.7722 22 12.75C21.9971 15.4013 20.9426 17.9431 19.0679 19.8179C17.1931 21.6926 14.6513 22.7471 12 22.75ZM17 12.75C17 13.0152 16.8946 13.2696 16.7071 13.4571C16.5196 13.6446 16.2652 13.75 16 13.75H13V16.75C13 17.0152 12.8946 17.2696 12.7071 17.4571C12.5196 17.6446 12.2652 17.75 12 17.75C11.7348 17.75 11.4804 17.6446 11.2929 17.4571C11.1054 17.2696 11 17.0152 11 16.75V13.75H8.00001C7.73479 13.75 7.48043 13.6446 7.2929 13.4571C7.10536 13.2696 7.00001 13.0152 7.00001 12.75C7.00001 12.4848 7.10536 12.2304 7.2929 12.0429C7.48043 11.8554 7.73479 11.75 8.00001 11.75H11V8.75C11 8.48478 11.1054 8.23043 11.2929 8.04289C11.4804 7.85536 11.7348 7.75 12 7.75C12.2652 7.75 12.5196 7.85536 12.7071 8.04289C12.8946 8.23043 13 8.48478 13 8.75V11.75H16C16.2652 11.75 16.5196 11.8554 16.7071 12.0429C16.8946 12.2304 17 12.4848 17 12.75Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2408_23312">
                                                    <rect width="24" height="24" fill="white" transform="translate(0 0.75)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full mb-4">
                                <div className="divider"></div>
                            </div>
                            {/* عنوان السؤال */}
                            <div className='col-start-1 mt-4  pr-4'>
                                <h3 className="mission-type"> عنوان السؤال </h3>

                            </div>
                            {/* درجة السؤال */}
                            <div className='col-start-2 mt-4  pr-4'>
                                <h3 className="mission-type"> درجة السؤال </h3>
                            </div>
                            {/* عنوان السؤال input */}
                            <div className="col-start-1 mt-4 mb-4 pr-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="عنوان السؤال"
                                        className="mission-address-input"
                                    // onChange={(e) => handleChangeMission(e.target.value, "name")}
                                    />
                                </div>
                            </div>
                            <div className="col-start-2 mt-4 mb-4 pr-4">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="اختر درجة السؤال"
                                        className="mission-address-input"
                                    // onChange={(e) => handleChangeMission(e.target.value, "name")}
                                    />
                                </div>
                            </div>
                            {/* Choises For First Question */}
                            {firstQuestion.map((item) => {
                                return (
                                    <>
                                        <div className='col-span-full'>
                                            <div className='choise-section justify-between pl-4'>
                                                <p className='choise-txt'>الاختيار {getArabicRanking(item.c_Id)}</p>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3" stroke="#EB001B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-start-1  mt-4 mb-4 pr-4'>
                                            <h3 className="mission-type "> عنوان الاختيار  </h3>

                                        </div>

                                        <div className='col-span-full'>
                                            <div className='flex gap-3'>
                                                <div >
                                                    <input
                                                        type="text"
                                                        placeholder="اكتب عنوان هنا"
                                                        className='input-choise'
                                                    // onChange={(e) => handleChangeMission(e.target.value, "name")}
                                                    />
                                                </div>
                                                <div className='flex gap-2'>
                                                    <h3 className="mission-type">    </h3>
                                                    <div className="bonus flex gap-4 items-center">
                                                        <span className="bonus-text">الأختيار الصحيح </span>
                                                        <input
                                                            type="checkbox"
                                                            className="switch switch-success"
                                                            checked={item.c_IsCorrect}
                                                        // onChange={() => setHasBonus(!hasBonus)}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}