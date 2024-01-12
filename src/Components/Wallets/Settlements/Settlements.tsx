import { Formik } from "formik";
import './Settlements.scss'
import { toast } from "react-toastify";
import moment from "moment";
import { Loading } from "../../Loading/Loading";
import API, { URL as link } from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import { useState } from "react";
import { selectedWalletType, toggleShowSettlementsComponent } from "../../../redux/Slices/WalletsSlice";
import { setMainHeaderName } from "../../../redux/Slices/MainHeaderSlice";
import { useNavigate } from "react-router-dom";
export const Settlements = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stateFromWalletsSlice = useSelector((state: any) => state.wallets);


    const [isLoading, setIsLoading] = useState(false);
    const [activeType, setActiveType] = useState(1);
    const [imageUploadWrapClass, setImageUploadWrapClass] = useState('image-upload-wrap');
    const [fileUploadContentVisible, setFileUploadContentVisible] = useState(false);
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const removeUpload = () => {
        setFile(null);
        setImageUploadWrapClass("image-upload-wrap");
        setFileUploadContentVisible(false);

    };
    const readURL = (input: any) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {

                setImageUploadWrapClass("image-upload-wrap image-dropping");
                setFileUploadContentVisible(true);
                setFile(input.files[0])

            };

            reader.readAsDataURL(input.files[0]);
        } else {
            removeUpload();
        }
    };

    const handleDragOver = () => {
        setImageUploadWrapClass("image-upload-wrap image-dropping");
    };

    const handleDragLeave = () => {
        setImageUploadWrapClass("image-upload-wrap");
    };
    const handleChangeInput = (e: any, field: string) => {
        if (field === "price") {
            setPrice(Number(e));
        }
        else {
            setDetails(e);
        }
    }
    const handleCancelSettlement = () => {
        let mainHeaderName = "ادارة المحافظ";
        dispatch(setMainHeaderName({ mainHeaderName }));
        let type = 4;
        dispatch(selectedWalletType({ type }));
        navigate(-1);
    }
    const handleSubmitSettlement = () => {
        setIsLoading(true);

        if (price === 0) {
            toast.error("من فضلك قم بأدخال المبلغ")
            setIsLoading(false);

        }
        else {
            const FormData = require('form-data');
            let data = new FormData();
            data.append('user_id', stateFromWalletsSlice.userId)
            data.append(
                "type",
                activeType === 1 ? "إضافة رصيد دائن" : "خصم رصيد خاطئ"
            );
            data.append('amount', price);
            data.append('details', details);
            data.append('attachments', file);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${link}dashboard/wallets/settlements`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-type': 'multipart/form-data', // Set the Content-Type for FormData
                    'Accept': 'multipart/form-data', // Set the Accept header if needed

                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (response.status === 201) {
                        toast.success("تمت عمليه التسوية بنجاح ");
                        setIsLoading(false);
                        handleCancelSettlement();
                    } else if (response.status === 400) {
                        toast.error("غير مسموح بأن المبلغ المتاح للتسوية يساوي صفر")
                        setIsLoading(false);
                    }
                    else {
                        toast.error("حدث خطأ ما يرجي التواصل مع المسؤولين")
                        setIsLoading(false);
                        handleCancelSettlement();
                    }
                }).catch((error) => {
                    toast.error("غير مسموح بأن المبلغ المتاح للتسوية يساوي صفر")
                    setIsLoading(false);
                    handleCancelSettlement();
                });

        }
    }
    return (
        <div className="Settlements">
            {isLoading === true ? <Loading /> : null}
            <div className="add-section mb-4">
                <div className="grid grid-cols-2">
                    <div className="col-start-1 mt-4 mb-4 pr-4">
                        <h2 className="flex justify-start mission-details">
                            التسوية
                        </h2>
                    </div>
                    <div className="col-span-full mb-4">
                        <div className="divider"></div>
                    </div>
                    {/* نوع المهمة */}
                    <div className="col-start-1  mb-4 pr-8">
                        <h3 className="mission-type"> النوع</h3>
                    </div>
                    <div className="col-start-1 gap-4 flex pr-6 mb-4">
                        <div
                            className={activeType === 1 ? "settlement-type-active" : "settlement-type"}
                            onClick={() => setActiveType(1)}>
                            اضافة رصيد دائن
                        </div>
                        <div
                            className={activeType === 2 ? "settlement-type-active" : "settlement-type"}
                            onClick={() => setActiveType(2)}>

                            خصم رصيد خاطئ
                        </div>


                    </div>
                    {/* المبلغ */}
                    <div className="col-start-1 pr-8">
                        <h3 className="mission-type"> المبلغ</h3>
                    </div>
                    <div className="col-span-full mt-4 mb-4 pr-4 pl-20">
                        <div>
                            <input
                                type="number"
                                placeholder="00"
                                className="mission-map-input"
                                onChange={(e) => handleChangeInput(e.target.value, "price")}
                            />
                        </div>
                    </div>

                    {/* تفاصيل */}
                    <div className="col-span-full mb-4 pr-4 pl-4">
                        <div className="txt-area">
                            <textarea
                                style={{ width: "100%" }}
                                className="mission-text-area"
                                placeholder="تفاصيل "
                                onChange={(e) => handleChangeInput(e.target.value, "details")}

                            />
                        </div>
                    </div>
                    {/* Upload Here */}
                    <div className="col-span-full pr-4 pl-4">
                        <div className={imageUploadWrapClass}>
                            <input
                                onDragOver={() => handleDragOver()}
                                onDragLeave={() => handleDragLeave()}
                                className="file-upload-input"
                                type="file"
                                onChange={(e) => readURL(e.target)}
                                accept="image/*"
                            />
                            <div className="drag-text">
                                <h3>قم بسحب الملفات وإفلاتها، أو تصفحها</h3>
                                <p className="">
                                    دعم جميع الملفات، الحجم الأقصى 60 ميجابايت
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full">
                        {fileUploadContentVisible && file && (
                            <div className="row mb-3">
                                <div className="file-upload-content">
                                    <img
                                        className="file-upload-image"
                                        src={URL.createObjectURL(file)}
                                        alt="your"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="add-actions p-5">
                <div className="grid grid-cols-2">
                    <div className="col-start-1">
                        <div className="flex gap-4">
                            <div
                                className="add-btn"
                                onClick={() => handleSubmitSettlement()}
                            >
                                اضافة
                            </div>
                            <div
                                className="cancel-btn"
                                onClick={() => handleCancelSettlement()}
                            >
                                الغاء
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}