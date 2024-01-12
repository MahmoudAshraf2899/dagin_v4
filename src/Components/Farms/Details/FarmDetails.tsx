import './FarmDetails.scss'
import chicken from "../../../Assets/Icons/Chicken.jpg";
import mapImg from "../../../Assets/Icons/Mapsicle Map.png";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API, { URL } from '../../../Api';
import { Loading } from '../../Loading/Loading';
import { useParams } from 'react-router-dom';

interface ApiResponse {
    id: string;
    user_id: string;
    name: string;
    area: number;
    license_number: number;
    photo: string;
    gov_id: string;
    city_id: string;
    village: string;
    full_address: string;
    rented: number;
    latitude: number;
    longitude: number;
    dajin_breed_id: string;
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        name: string;
        mobile_number: string;
    }
    dajinBreed: string;
}
export const FarmDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const { farmId } = useParams<{ farmId: string }>();
    const [rangeText, setRangeText] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);

        API.get(`farms/${farmId}`).then((res) => {
            if (res) {
                const updatedFarmerData = {
                    ...res.data,
                    photo: `${URL}${res.data.photo}`,
                };

                setApiResponse(updatedFarmerData);
                API.get(`work-areas`).then((response) => {

                    const idAndNameData = response.data.map((item: any) => ({ id: item.id, name: item.name }));
                    const governorateData = response.data.map((item: any) =>
                        ({ governorateId: item.governorate.id, governorateName: item.governorate.name }));
                    const getDistinctValues = (arr: { governorateId: string, governorateName: string }[]) => {
                        const uniqueValues = arr.filter((value, index, self) =>
                            index === self.findIndex(v => v.governorateId === value.governorateId)
                        );
                        return uniqueValues;
                    };
                    const distinctGovernorateData = getDistinctValues(governorateData);

                    let govName = "";
                    let cityName = "";
                    if (distinctGovernorateData.length > 0 && distinctGovernorateData != null && idAndNameData.length > 0 && idAndNameData != null) {
                        govName = distinctGovernorateData.find(c => c.governorateId === res.data.gov_id)?.governorateName ?? "";
                        cityName = idAndNameData.find((c: any) => c.id === res.data.city_id)?.name ?? "";
                    }
                    setRangeText(`${govName},${cityName}`)

                })
                setIsLoading(false);
            }
        })
    }, []);
    const handleImageError = (event: any) => {
        // Set a fallback image source when the original image fails to load
        event.target.src = chicken;
    };
    return (
        <div className="FarmDetails">
            <div className='grid grid-cols-2 content'>
                {/* Farm Details */}
                <div className='col-start-1'>
                    <p className='farm-detials'>تفاصيل العنبر</p>
                </div>
                {/* Close Icon */}
                <div className='col-start-2 flex justify-end pl-4'>
                    <svg
                        onClick={() => navigate(-1)}
                        xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 13 12" fill="none">
                        <path d="M11.4473 1.21143L1.54777 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.54688 1.21143L11.4464 11.1109" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                {/* Image and content */}
                <div className='col-span-full flex justify-between mt-4'>
                    <div className='flex gap-4'>
                        <div>

                            <img src={apiResponse?.photo} className='farm-img' alt="farm-img"
                                onError={handleImageError} />
                        </div>
                        <div className='farm-info'>
                            <p className='farm-name w-full mb-4'>{apiResponse?.name}</p>
                            <div className='flex mb-4'>
                                <span className='title'>الترخيص :</span>
                                <span className='title-content'>{apiResponse?.license_number === null ? "غير مرخص" : apiResponse?.license_number}</span>
                            </div>
                            <div className='flex mb-4'>
                                <span className='title'>المرافق :</span>
                                {/* <span className='title-content'>ديزل - كهرباء</span> */}
                            </div>
                            <div className='flex mb-4'>
                                <span className='title'>تبعية “ملكية” العنبر :</span>
                                {/* <span className='title-content'>تمليك</span> */}
                            </div>

                        </div>
                    </div>
                    {/* <div className='status'>
                        مغلق
                    </div> */}
                </div>
                {/* Farm Range */}
                <div className='col-start-1 mt-4'>
                    <div className='range-farm'>
                        <div className='flex range-icon gap-4'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                    <path d="M2.14575 2.37963L2.14575 2.37963C3.9996 0.493248 7.00045 0.493252 8.85427 2.37962L9.3892 1.85393L8.85427 2.37963C10.7192 4.27733 10.7088 7.40688 8.86152 9.23581L8.8559 9.24138L8.8504 9.24706L5.49605 12.7112L2.14574 9.30213C0.284754 7.40851 0.28475 4.27327 2.14575 2.37963ZM3.58905 5.81131C3.58905 6.86293 4.43502 7.74266 5.50003 7.74266C6.56499 7.74266 7.41093 6.8629 7.41093 5.81131C7.41093 4.75976 6.56497 3.88003 5.50003 3.88003C4.43505 3.88003 3.58905 4.75974 3.58905 5.81131Z" stroke="black" stroke-width="1.5" />
                                </svg>
                            </div>
                            <span className='title'>النطاق :</span>
                        </div>
                        <span className='title-content'>{rangeText}</span>
                    </div>
                </div>
                {/* Map URL */}
                <div className='col-span-full mt-4'>
                    <div className='map-container'>
                        <a href="#" className='w-full'>
                            <img src={mapImg} alt="map" className='map' />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}