import { useState, useEffect } from 'react';
import './AccountStatement.scss'
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import { setFilterDate } from '../../../../redux/Slices/WalletsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../Loading/Loading';
import { toast } from 'react-toastify';
import moment from "moment";
import API from '../../../../Api';
export const AccountStatement = () => {
    const [values, setValues] = useState([new DateObject(), new DateObject()]);
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const dispatch = useDispatch();
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);



    useEffect(() => {
        setIsLoading(true);
        if (stateFromWalletsSlice.startDate === null || stateFromWalletsSlice.finishDate === null) {

            API.get('dashboard/wallets/transactions').then((res) => {
                if (res) {
                    setTransactions(res.data.items);
                    setIsLoading(false);
                } else {
                    toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
                    setIsLoading(false);
                }
            })
        } else {

            API.get(`dashboard/wallets/transactions?date_from=${stateFromWalletsSlice.startDate}&date_to=${stateFromWalletsSlice.finishDate}`).then((res) => {
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

    const handleDateChange = (newValues: any) => {
        // Handle newValues as needed
        setValues(newValues);
        let fromDate = newValues[0];
        let toDate = newValues[1];
        if (toDate !== undefined) {
            dispatch(setFilterDate({ fromDate, toDate }))
        }
    };

    return (
        <div className="AccountStatement pr-10 pl-10 mt-4">
            {isLoading === true ? (
                <>
                    <Loading />
                </>
            ) : null}
            <div className="grid grid-cols-2">
                <div className="col-span-full">
                    <div className="flex justify-between">
                        <h2 className="title">كشف حساب</h2>

                        <DatePicker
                            inputClass="filterWallet"
                            value={values}
                            dateSeparator="الي"
                            onChange={handleDateChange}
                            range
                            // rangeHover
                            format="YYYY-MM-DD"
                        />
                    </div>
                </div>

                <div className='col-span-full mt-10'>
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
                                    <th className="bannerText">Actions</th>

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
                                            backgroundColor: "#FFF",
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

                                        <span className='settelement'>
                                            تسوية
                                        </span>


                                    </div>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )

}