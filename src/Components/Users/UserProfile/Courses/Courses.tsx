import './Courses.scss'
import courseCover from '../../../../Assets/Icons/Chicken.jpg'
import userImg from '../../../../Assets/Icons/UserTwo.svg';
export const Courses = () => {
    return (
        <div className="Courses">
            <div className='grid grid-cols-3 mt-10 pr-10'>
                <div className='col-span-full'>
                    <h3 className='title'>الكورسات</h3>
                </div>
                <div className='mt-4 courses-section'>
                    <div className='course-cover relative'>
                        <div className='status flex absolute bottom-1 left-1  p-2'>
                            مبتدئ
                        </div>
                        <img src={courseCover} alt="course-cover" className='course-img' />
                    </div>
                    <h3 className='course-title'>مقدمة اساسية عن تربية الدواجن</h3>
                    <div className='flex w-full justify-between'>
                        <div className='flex gap-4'>
                            <div><img src={userImg} alt="user-img" /></div>
                            <span className='user-name'>احمد محسن</span>

                        </div>
                        <div className='flex items-center gap-2'>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2.5L12.0279 7.20889L17.1329 7.68237L13.2811 11.0661L14.4084 16.0676L10 13.45L5.59161 16.0676L6.71886 11.0661L2.86708 7.68237L7.97214 7.20889L10 2.5Z" fill="#FFBB54" />
                            </svg></span>
                            <span className='number'>4.5</span>
                        </div>
                    </div>
                    <div className='w-full'>
                        <progress className="progress progress-flat-success" value="80" max="100" style={{ width: "100%" }}></progress>
                        <div className='flex gap-2'>
                            <div className='score'>
                                4/5 وحدة
                            </div>
                            <div className='percentage'>
                                80%
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}