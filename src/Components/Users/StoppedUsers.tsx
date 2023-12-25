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
        API.get('dashboard/salesman?account_status=3').then((res) => {
            if (res) {
                setUsers(res.data.items)
                setIsLoading(false);
            }
        })
    }, []);
    const showEditUser = (userId: number) => {
        let visible = true;
        dispatch(toggleShowEditUser({ visible }))
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
                                                        className="three-dots-li"
                                                    // htmlFor="modal-1"
                                                    //   onClick={() => ShowMissionDetailsPopUp(item.id)}
                                                    >
                                                        تصفح الحساب
                                                    </label>
                                                    <input
                                                        className="modal-state"
                                                        id="modal-1"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="three-dots-li"
                                                        htmlFor="modal-2"
                                                        onClick={() => showEditUser(Number(user.id))}
                                                    >
                                                        تعديل الحساب
                                                    </label>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-full mt-8'>
                                    <div className='de-active-btn'>الغاء تفعيل الحساب</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}