import './CreditBalanceOnly.scss';
import { useEffect, useState } from 'react';
import API from '../../../Api';
import moment from "moment";
import { Loading } from '../../Loading/Loading';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from "../../../Assets/Icons/user.jpeg";
import { setUserId, toggleShowSettlementsComponent } from '../../../redux/Slices/WalletsSlice';
import { setMainHeaderName } from '../../../redux/Slices/MainHeaderSlice';
export const CreditBalanceOnly = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);
    useEffect(() => {
        setIsLoading(true);
        API.get('dashboard/wallets').then((res) => {
            if (res) {
                setData(res.data.items);
                setIsLoading(false);
            }
        })
    }, []);
    const handleShowSettlementComponent = (userId: number) => {
        setIsLoading(true);

        let isVisible = true;
        dispatch(setUserId({ userId }))
        dispatch(toggleShowSettlementsComponent({ isVisible }))
        setIsLoading(false);
        let mainHeaderName = "التسوية";
        dispatch(setMainHeaderName({ mainHeaderName }));

    }
    return (
        <div className='CreditBalanceOnly'>
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            <div className='grid grid-cols-2'>
                {data.map((item: any, index: any) => (
                    <div key={index} className={`grid col-start-${index % 2 === 0 ? 1 : 2} p-4`}>

                        <div className='userCard pr-4 pt-8'>


                            <div className='flex justify-between'>
                                <div className='flex gap-4'>
                                    <div>
                                        <img src={userIcon} alt='user' />
                                    </div>
                                    <div className='grid'>
                                        <span className='user-name'>{item.wallet_balance} جنيه</span>
                                        <div className='flex items-center gap-4'>

                                            <span className='typeOfSpecialization'>{item.name}</span>
                                            <span className='type-status'>
                                                {/* {`. ${item.graduationStatus} . عضو منذ ${item.memberSince}`} */}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className='col-span-full mt-8'>
                                <label htmlFor='modal-454'>
                                    <div className='de-active-btn'
                                        onClick={() => handleShowSettlementComponent(Number(item.id))}

                                    >تسوية</div>
                                </label>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}