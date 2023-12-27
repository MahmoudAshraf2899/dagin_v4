import './DepitTransactions.scss'
import { useEffect, useState } from 'react';
import API from '../../../Api';
import moment from "moment";
import { Loading } from '../../Loading/Loading';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
export const DepitTransactions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);
    useEffect(() => {
        setIsLoading(true);
        if (stateFromWalletsSlice.startDate === null || stateFromWalletsSlice.finishDate === null) {
            let type = encodeURIComponent('مدينة');

            API.get(`dashboard/wallets/transactions?type=${type}`).then((res) => {
                if (res) {
                    setTransactions(res.data.items);
                    setIsLoading(false);
                } else {
                    toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
                    setIsLoading(false);
                }
            })
        } else {
            let type = 'مدينة'
            API.get(`dashboard/wallets/transactions?type=${type}& date_from=${stateFromWalletsSlice.startDate}&date_to=${stateFromWalletsSlice.finishDate}`).then((res) => {
                if (res) {
                    setTransactions(res.data.items);
                    setIsLoading(false);
                } else {
                    toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
                    setIsLoading(false);
                }
            })
        }
    }, [stateFromWalletsSlice]);
    return (
        <div className="DepitTransactions">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            {/* Reports */}
            <div className='flex gap-4 mb-4'>
                <div className='report p-8 '>
                    <div className='flex items-center gap-4'>
                        <h3 className='amount'>
                            ١٣٠،٠٠٠
                        </h3>
                        <span className='coin'>جنيه</span>
                    </div>
                    <div className='report-title'>إجمالي المديونية</div>
                </div>
                <div className='report p-8 '>
                    <div className='flex items-center gap-4'>
                        <h3 className='amount'>
                            ١٣٠،٠٠٠
                        </h3>
                        <span className='coin'>جنيه</span>
                    </div>
                    <div className='report-title'>إجمالي المبالغ المدفوعة</div>
                </div>
            </div>
            <table
                style={{
                    width: "100%",
                }}
            >
                <thead>
                    <tr>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <th className="bannerText">التاريخ</th>
                            <th className="bannerText">العميل</th>
                            <th className="bannerText">مبلغ دائن</th>
                            <th className="bannerText">مبلغ مدين</th>
                            <th className="bannerText">الرصيد</th>
                            <th className="bannerText">البيان</th>

                        </div>
                    </tr>
                </thead>
                <div
                    style={{
                        visibility: "hidden",
                        marginTop: "20px",
                        marginBottom: "80px",
                    }}
                ></div>
                <tbody>
                    {transactions.map((item: any) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    height: "70px",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                }}
                            >
                                <span className="wallet-date">
                                    {moment(item.created_at).format("YYYY/MM/DD")}
                                </span>
                                <span className="wallet-client-name"> {item.user !== null ? item.user.name : ""}</span>
                                {/* مبلغ دائن */}
                                <span className="wallet-price">  {item.type === 'مدينة' ? item.amount : "٠"} جم</span>
                                {/* مبلغ مدين */}
                                <span className="wallet-price">   {item.type === 'دائنة' ? item.amount : "٠"} جم</span>
                                <span className="wallet-price">  ١000 جم</span>
                                <span className="wallet-price">

                                    <span className="mission-number">
                                        قيمة مهمة <span className='number'>رقم</span> {item.mission !== null ? item.mission.id : "٠"}
                                    </span>
                                </span>


                            </div>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}