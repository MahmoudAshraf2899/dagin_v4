import './Users.scss';
import userIcon from '../../Assets/Icons/40px.svg';
import { useEffect, useState } from 'react';
import API from '../../Api';
import { Loading } from '../Loading/Loading';
export const ActiveUsers =()=>{
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API and update the 'users' state
    // API.get('users/').then((res)=>{
    //     if(res){

    //         setUsers(res.data)
    //     }
    // })
  }, []);
    return(
            <div className="Users">
                 {isLoading === true ? (
                    <>
                      <Loading />
                    </>
                  ) : null}
                <div className='grid grid-cols-2'>
                    {/* First Column */}
                    <div className='grid col-start-1 p-4'>
                            <div className='userCard pr-4 pt-8'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-4'>
                                       <div> <img src={userIcon} alt="user" /></div>
                                        <div className='grid'>
                                            <span className='user-name'>رحمة محمة</span>
                                            <div className='flex'>
                                                <span className='typeOfSpecialization'>نوع التخصص</span>
                                                <span className='type-status'>
                                                  . حديث التخرج . عضو منذ ١٢\١٠\٢٠٢٣
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='three-dots flex items-center pl-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                                          <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"                                       stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"                                      stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#94A3B8"                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>

                                </div>

                                <div className='col-span-full mt-8'>
                                 <div className='de-active-btn'>
                                 الغاء تفعيل الحساب
                                 </div>
                                </div>
                            </div>
                    </div>
                    <div className='grid col-start-2 p-4'>
                            <div className='userCard pr-4 pt-8'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-4'>
                                       <div> <img src={userIcon} alt="user" /></div>
                                        <div className='grid'>
                                            <span className='user-name'>رحمة محمة</span>
                                            <div className='flex'>
                                                <span className='typeOfSpecialization'>نوع التخصص</span>
                                                <span className='type-status'>
                                                  . حديث التخرج . عضو منذ ١٢\١٠\٢٠٢٣
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='three-dots flex items-center pl-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                                          <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"                                       stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"                                      stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#94A3B8"                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>

                                </div>

                                <div className='col-span-full mt-8'>
                                 <div className='de-active-btn'>
                                 الغاء تفعيل الحساب
                                 </div>
                                </div>
                            </div>
                    </div>
                    <div className='grid col-start-1 p-4'>
                            <div className='userCard pr-4 pt-8'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-4'>
                                       <div> <img src={userIcon} alt="user" /></div>
                                        <div className='grid'>
                                            <span className='user-name'>رحمة محمة</span>
                                            <div className='flex'>
                                                <span className='typeOfSpecialization'>نوع التخصص</span>
                                                <span className='type-status'>
                                                  . حديث التخرج . عضو منذ ١٢\١٠\٢٠٢٣
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='three-dots flex items-center pl-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                                          <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"                                       stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"                                      stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                          <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#94A3B8"                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>

                                </div>

                                <div className='col-span-full mt-8'>
                                 <div className='de-active-btn'>
                                 الغاء تفعيل الحساب
                                 </div>
                                </div>
                            </div>
                    </div>
                 

                
                    
                </div>
            </div>
    );
}