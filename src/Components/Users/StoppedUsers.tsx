import './Users.scss';
import userIcon from '../../Assets/Icons/40px.svg';
import { useEffect, useState } from 'react';
import API from '../../Api';
import { Loading } from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { setUserId, toggleShowEditUser } from '../../redux/Slices/UsersSlice';

export const StoppedUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        API.get('dashboard/salesman?account_status=3&limit=50000000').then((res) => {
            if (res) {
                setUsers(res.data.items)
                setIsLoading(false);
            }
        })
    }, []);
    const showEditUser = (userId: number) => {
        let isVisible = true;
        dispatch(toggleShowEditUser({ isVisible }))
        dispatch(setUserId({ userId }))
    }
    return (
        <div className="Users">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            <div className='grid grid-cols-2'>

                {users.map((user: any, index) => (
                    <div key={index} className={`grid col-start-${index % 2 === 0 ? 1 : 2} p-4`}>
                        <div className='userCard pr-4 pt-8'>

                            <div className='flex justify-between'>
                                <div className='flex gap-4'>
                                    <div>
                                        <img src={userIcon} alt='user' />
                                    </div>
                                    <div className='grid'>
                                        <span className='user-name'>{user.name}</span>
                                        <div className='flex'>
                                            <span className='typeOfSpecialization'>التخصص</span>
                                            <span className='type-status'>
                                                {`. ${user.graduationStatus} . عضو منذ ${user.memberSince}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='three-dots flex items-center pl-4'>
                                    <div className="popover" style={{ backgroundColor: "white" }}>
                                        <svg
                                            className="popover-trigger arrow"
                                            tabIndex={0}
                                            xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                                            <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div
                                            className="popover-content popover-bottom-left"
                                            tabIndex={0}
                                        >
                                            <ul>
                                                <label
                                                    className="three-dots-li flex justify-between"
                                                // htmlFor="modal-1"
                                                //   onClick={() => ShowMissionDetailsPopUp(item.id)}
                                                >
                                                    <span>تصفح الحساب</span>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8.00033 8.00004C9.84127 8.00004 11.3337 6.50766 11.3337 4.66671C11.3337 2.82576 9.84127 1.33337 8.00033 1.33337C6.15938 1.33337 4.66699 2.82576 4.66699 4.66671C4.66699 6.50766 6.15938 8.00004 8.00033 8.00004Z" stroke="#9C9CA4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667" stroke="#9C9CA4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <input
                                                    className="modal-state"
                                                    id="modal-1"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="three-dots-li-edit flex justify-between"
                                                    htmlFor="modal-2"
                                                    onClick={() => showEditUser(Number(user.id))}
                                                >
                                                    <span> تعديل الحساب</span>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                                                            <path d="M22 12V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H12M15.6864 4.02275C15.6864 4.02275 15.6864 5.45305 17.1167 6.88334C18.547 8.31364 19.9773 8.31364 19.9773 8.31364M9.15467 15.9896L12.1583 15.5605C12.5916 15.4986 12.9931 15.2978 13.3025 14.9884L21.4076 6.88334C22.1975 6.09341 22.1975 4.81268 21.4076 4.02275L19.9773 2.59245C19.1873 1.80252 17.9066 1.80252 17.1167 2.59245L9.01164 10.6975C8.70217 11.0069 8.50142 11.4084 8.43952 11.8417L8.01044 14.8453C7.91508 15.5128 8.4872 16.0849 9.15467 15.9896Z" stroke="#28303F" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                    </div>
                                                </label>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className='col-span-full mt-8'>
                                <div className='de-active-btn'>الغاء تفعيل الحساب</div>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}