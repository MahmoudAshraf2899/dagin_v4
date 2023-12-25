import closeIcon from "../../../../Assets/Icons/closeicon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../../Api";
import { useState } from "react";
import { setActiveUserData, toggleShowSuspendPopUp } from "../../../../redux/Slices/UsersSlice";
import './SuspendPopUp.scss'
import { Loading } from "../../../Loading/Loading";
export const SuspendPopUp = () => {
    const stateFromUserSlice = useSelector((state: any) => state.users);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const submitChoise = () => {
        setIsLoading(true);
        API.post(`dashboard/salesman/${stateFromUserSlice.userId}/suspend`).then((res) => {
            if (res.status === 201) {
                toast.success("تم الغاء تفعيل الحساب بنجاح");
                let activeUserData = [...stateFromUserSlice.activeUserData];
                const indexToDelete = activeUserData.findIndex((obj: any) => Number(obj.id) === stateFromUserSlice.userId);
                if (indexToDelete !== -1) {
                    // If the object with the specified ID is found, remove it
                    activeUserData.splice(indexToDelete, 1);
                }
                let isSuspendActive = false;
                dispatch(toggleShowSuspendPopUp({ isSuspendActive }))
                dispatch(setActiveUserData({ activeUserData }))
                setIsLoading(false);
            }
            else {
                toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين");
                setIsLoading(false);
            }
        })
    }

    return (
        <div className="SuspendPopUp">
            {isLoading === true ?
                <Loading /> : null}
            <input className="modal-state" id="modal-454" type="checkbox" />
            <div className="modal w-full">
                <label className="modal-overlay" htmlFor="modal-454"></label>
                <div
                    className="modal-content flex flex-col gap-5"
                    style={{
                        backgroundColor: "white",
                        width: "2500px",
                    }}
                >
                    <div className="grid grid-cols-2">
                        <div className="col-start-1">
                            <h2 className="flex justify-start mission-type-txt">
                                الغاء تفعيل حساب
                            </h2>
                        </div>

                        <div className="col-start-2 mb-4 flex justify-end">
                            <div className="flex gap-4">
                                <label htmlFor="modal-454">
                                    <img src={closeIcon} alt="close" />
                                </label>
                            </div>
                        </div>
                        <div className="col-span-full mb-2">
                            <div className="divider"></div>
                        </div>
                        <div className="col-span-full mb-4">
                            <span className="are-you-sure flex justify-start">
                                هل انت متاكد من انك تريد الغاء تفعيل هذا الحساب ؟
                            </span>
                        </div>
                        <div className="col-span-full">
                            <div className="flex actions gap-4">
                                <label htmlFor="modal-454">
                                    <div className="done"
                                        onClick={() => submitChoise()}
                                    >
                                        نعم
                                    </div>
                                </label>
                                <label htmlFor="modal-454">
                                    <div className="cancel">لا</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}