import './Farms.scss'
import chicken from "../../Assets/Icons/Chicken.jpg"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../Api';
import { Loading } from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

export const Farms = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [farms, setFarms] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [idAndNameArray, setIdAndNameArray] = useState<{ id: string, name: string }[]>([]);
    const [governorateArray, setGovernorateArray] = useState<{ governorateId: string, governorateName: string }[]>([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        setIsLoading(true);


        API.get(`farms?page=${pageNumber}&limit=${pageSize}`).then((res) => {
            if (res) {


                setTotalRows(res.data.meta.totalItems);
                const updatedFarmersData = res.data.items.map((farmer: any) => ({
                    ...farmer,
                    photo: farmer.photo.replace("/uploads", `/public/uploads`)

                }));
                setFarms(updatedFarmersData);


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


                    setIdAndNameArray(idAndNameData);
                    setGovernorateArray(distinctGovernorateData);
                })


                setIsLoading(false);
            }
        })
    }, [dispatch, pageNumber, pageSize, setFarms]);
    const hanldeChangePage = (targetPN: number) => {
        setIsLoading(true);
        API.get(`farms?page=${pageNumber}&limit=${pageSize}`).then((res) => {
            if (res) {
                setFarms(res.data.items);
                setTotalRows(res.data.totalCount);
                setPageNumber(targetPN);

                setIsLoading(false);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });

            }
        });
    }

    const renderPagination = () => {
        const nPages = Math.ceil(totalRows / pageSize);
        const numbers = Array.from({ length: nPages }, (_, index) => index + 1);
        let paginationItem = numbers.map((n) => {
            return (
                <>
                    <button
                        className={pageNumber === n ? "btn btn-pagination-active" : "btn"}
                        onClick={() => hanldeChangePage(n)}>{n}
                    </button>
                </>
            )
        })
        return (
            <div className={totalRows > 5 ? "pagination w-full max-w-xs overflow-auto" : "pagination"}>

                {paginationItem}

            </div >
        );
    }
    const renderFarmLocation = (city_id: string, gov_id: string) => {
        let govName = "";
        let cityName = "";
        if (governorateArray.length > 0 && governorateArray != null && idAndNameArray.length > 0 && idAndNameArray != null) {
            govName = governorateArray.find(c => c.governorateId === gov_id)?.governorateName ?? "";
            cityName = idAndNameArray.find(c => c.id === city_id)?.name ?? "";
        }
        return `${govName},${cityName}`
    }
    const handleImageError = (event: any) => {
        // Set a fallback image source when the original image fails to load
        event.target.src = chicken;
    };
    return (
        <div className='Farms pt-5 pr-5 pl-5'>
            <div className='grid grid-cols-3 gap-6 mt-5 pr-4 pl-4'>
                {isLoading === true ? (
                    <>
                        <Loading />
                    </>
                ) : null}
                {farms.map((item: any, index: any) => {

                    return (
                        <div className='big-section mb-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                            <div className='course-cover relative'>
                                {/* <div className='status flex absolute bottom-4 left-3  p-2'>
                                    <span>معروض للبيع</span>
                                </div> */}

                                <div className='three_dots flex absolute top-4 left-3  p-2'
                                >
                                    <div className="popover" style={{ backgroundColor: "white" }}>
                                        <svg
                                            className="popover-trigger mx-2 arrow"
                                            tabIndex={0}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                                fill="#A7AEC1"
                                            />
                                            <path
                                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                                fill="#A7AEC1"
                                            />
                                            <path
                                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                                fill="#A7AEC1"
                                            />
                                        </svg>
                                        <div
                                            className="popover-content popover-right-top right-auto"
                                            tabIndex={0}
                                        >
                                            <ul>
                                                <label
                                                    className="three-dots-li"
                                                    htmlFor="modal-1"
                                                    onClick={() => navigate(item.id)}
                                                >
                                                    تفاصيل العنبر
                                                </label>
                                                <input
                                                    className="modal-state"
                                                    id="modal-1"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="three-dots-li-delete"
                                                    htmlFor="modal-1"
                                                // onClick={() => navigate(item.id)}
                                                >
                                                    حذف العنبر
                                                </label>
                                                <input
                                                    className="modal-state"
                                                    id="modal-2"
                                                    type="checkbox"
                                                />



                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <img src={chicken} alt="course-cover" className='course-img' /> */}
                                <img src={item.photo} alt="course-cover" className='course-img'
                                    onError={handleImageError} />

                            </div>
                            <p className='farm-name mb-2 mt-2'>
                                {item.name}
                            </p>
                            <div className='flex gap-2'>
                                {/* Location Icon */}
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                        <path d="M9.0855 0.000488281C4.16625 0.000488281 0 4.19074 0 9.15349C0 14.351 4.82925 19.6662 8.0775 23.402C8.09025 23.417 8.61525 23.9997 9.26175 23.9997H9.31875C9.966 23.9997 10.4873 23.417 10.5 23.402C13.548 19.898 18 14.1192 18 9.15349C18 4.18999 14.7502 0.000488281 9.0855 0.000488281ZM9.38625 22.3955C9.36 22.4217 9.32175 22.451 9.288 22.4757C9.2535 22.4517 9.216 22.4217 9.18825 22.3955L8.796 21.944C5.7165 18.4115 1.49925 13.5732 1.49925 9.15274C1.49925 5.00374 4.97325 1.49899 9.08475 1.49899C14.2065 1.49899 16.4993 5.34274 16.4993 9.15274C16.4993 12.5082 14.106 16.9647 9.38625 22.3955ZM9.02625 4.54174C6.5415 4.54174 4.52625 6.55624 4.52625 9.04174C4.52625 11.5272 6.5415 13.5417 9.02625 13.5417C11.511 13.5417 13.5262 11.5265 13.5262 9.04174C13.5262 6.55699 11.5118 4.54174 9.02625 4.54174ZM9.02625 12.0417C7.37175 12.0417 5.99175 10.6632 5.99175 9.00874C5.99175 7.35424 7.33725 6.00874 8.99175 6.00874C10.647 6.00874 11.9918 7.35424 11.9918 9.00874C11.9925 10.6632 10.6815 12.0417 9.02625 12.0417Z" fill="black" />
                                    </svg>
                                </div>
                                <span className='farm-location'>{renderFarmLocation(item.city_id, item.gov_id)}</span>
                            </div>
                            <div className='flex gap-3 mt-4'>
                                {/* Chicken Type */}
                                <div className='flex items-center gap-1'>
                                    {/* Chicken Icon */}
                                    <div>
                                        <svg fill="#bfbfbf" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.48 425.48" enable-background="new 0 0 425.48 425.48" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" stroke="#bfbfbf"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m414.221,100.116l-22.783-44.493c-1.656-3.235-3.58-6.275-5.717-9.124l4.675-14.217c2.156-6.558-1.412-13.623-7.97-15.779-6.558-2.157-13.623,1.413-15.779,7.97l-1.47,4.47c-0.832-0.44-1.674-0.864-2.529-1.268l.145-15.056c0.066-6.903-5.476-12.553-12.379-12.62-6.872-0.075-12.553,5.476-12.62,12.379l-.089,9.251c-0.826-0.026-1.651-0.032-2.476-0.025l-5.481-11.109c-3.055-6.19-10.548-8.732-16.741-5.678-6.191,3.055-8.733,10.55-5.678,16.741l2.763,5.599c-0.924,0.419-1.842,0.86-2.752,1.325-0.078,0.04-0.158,0.084-0.236,0.124l-9.48-6.839c-5.598-4.039-13.412-2.776-17.45,2.824-4.039,5.599-2.775,13.412 2.824,17.45l4.233,3.054c-16.288,18.827-49.686,44.913-95.627,61.821-37.114,13.659-93.92,25.206-153.79,2.639-3.105-1.17-6.55-1.058-9.573,0.313s-5.376,3.889-6.541,6.998c-17.351,46.312-15.541,96.57 5.099,141.517 20.637,44.942 57.584,79.07 104.035,96.099 7.011,2.57 14.114,4.688 21.274,6.377l30.673,39.619h-2.742c-6.903,0-12.5,5.596-12.5,12.5s5.597,12.5 12.5,12.5h54.691c6.904,0 12.5-5.596 12.5-12.5 0-6.903-5.596-12.5-12.5-12.5h-20.333l-26.987-34.859c2.172,0.078 4.344,0.127 6.516,0.127 26.593-0.001 53.149-5.851 78.073-17.479 44.892-20.945 78.816-57.977 95.522-104.274 1.356-3.759 2.603-7.597 3.706-11.406 9.463-32.667 6.019-65.426-9.585-93.739l46.72-21.7c3.083-1.432 5.449-4.057 6.554-7.271 1.105-3.211 0.855-6.736-0.695-9.761zm-70.216,135.395c-14.432,39.992-43.758,71.992-82.577,90.104-38.791,18.098-82.115,20.016-121.99,5.397-40.15-14.718-72.084-44.216-89.92-83.059-3.594-7.826-6.523-15.839-8.793-23.973 3.431,1.585 7.003,2.969 10.709,4.081 1.198,0.359 2.407,0.531 3.597,0.531 5.376,0 10.344-3.497 11.968-8.912 1.984-6.612-1.769-13.581-8.381-15.564-13.601-4.08-20.754-11.405-23.528-14.891-0.134-2.747-0.19-5.498-0.179-8.249 5.966,2.099 13.293,3.736 22.305,4.524 0.371,0.032 0.738,0.048 1.103,0.048 6.411,0 11.87-4.906 12.438-11.412 0.601-6.877-4.487-12.94-11.364-13.542-11.893-1.04-18.557-3.72-22.168-5.956 1.016-5.859 2.365-11.688 4.049-17.462 60.952,19.016 121.454,9.117 170.635-11.424 2.088,13.096 8.404,25.243 18.242,34.578 10.962,10.402 25.177,16.263 40.028,16.718 7.15,12.84 18.783,22.785 32.748,27.784 6.649,2.38 13.6,3.559 20.533,3.559 9.597,0 19.151-2.279 27.831-6.73-0.404,7.922-1.75,15.947-4.076,23.973-0.956,3.298-2.036,6.621-3.21,9.877zm-5.779-113.35c-3.379,1.569-5.881,4.564-6.826,8.168-0.944,3.604-0.232,7.441 1.942,10.466 7.496,10.427 12.69,21.854 15.53,33.853l-8.442,4.507c-9.07,4.847-19.397,5.607-29.079,2.141-9.689-3.469-17.193-10.617-21.115-20.092l-.71-1.73c-2.136-5.206-7.486-8.342-13.071-7.663-10.684,1.296-21.29-2.206-29.098-9.615-7.641-7.25-11.679-17.375-11.162-27.873 33.358-17.552 59.459-39.234 73.848-57.6 1.769-2.258 5.387-4.293 8.691-5.986 8.912-4.563 19.069-5.383 28.598-2.308s17.291,9.677 21.854,18.589l16.862,32.931-47.822,22.212z"></path> <path d="m337.942,59.989c-3.29,0-6.51,1.33-8.84,3.66-2.32,2.32-3.66,5.54-3.66,8.83s1.34,6.52 3.66,8.84c2.33,2.33 5.55,3.66 8.84,3.66s6.51-1.33 8.84-3.66c2.33-2.32 3.66-5.55 3.66-8.84s-1.33-6.51-3.66-8.83c-2.33-2.33-5.55-3.66-8.84-3.66z"></path> </g> </g></svg>
                                    </div>
                                    <span className='chicken-type'>فراخ بيضة</span>
                                </div>

                                {/* Chicken Counter */}
                                <div className='flex items-center gap-1'>
                                    {/* Chicken Icon */}
                                    <div>
                                        <svg fill="#bfbfbf" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.48 425.48" enable-background="new 0 0 425.48 425.48" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" stroke="#bfbfbf"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m414.221,100.116l-22.783-44.493c-1.656-3.235-3.58-6.275-5.717-9.124l4.675-14.217c2.156-6.558-1.412-13.623-7.97-15.779-6.558-2.157-13.623,1.413-15.779,7.97l-1.47,4.47c-0.832-0.44-1.674-0.864-2.529-1.268l.145-15.056c0.066-6.903-5.476-12.553-12.379-12.62-6.872-0.075-12.553,5.476-12.62,12.379l-.089,9.251c-0.826-0.026-1.651-0.032-2.476-0.025l-5.481-11.109c-3.055-6.19-10.548-8.732-16.741-5.678-6.191,3.055-8.733,10.55-5.678,16.741l2.763,5.599c-0.924,0.419-1.842,0.86-2.752,1.325-0.078,0.04-0.158,0.084-0.236,0.124l-9.48-6.839c-5.598-4.039-13.412-2.776-17.45,2.824-4.039,5.599-2.775,13.412 2.824,17.45l4.233,3.054c-16.288,18.827-49.686,44.913-95.627,61.821-37.114,13.659-93.92,25.206-153.79,2.639-3.105-1.17-6.55-1.058-9.573,0.313s-5.376,3.889-6.541,6.998c-17.351,46.312-15.541,96.57 5.099,141.517 20.637,44.942 57.584,79.07 104.035,96.099 7.011,2.57 14.114,4.688 21.274,6.377l30.673,39.619h-2.742c-6.903,0-12.5,5.596-12.5,12.5s5.597,12.5 12.5,12.5h54.691c6.904,0 12.5-5.596 12.5-12.5 0-6.903-5.596-12.5-12.5-12.5h-20.333l-26.987-34.859c2.172,0.078 4.344,0.127 6.516,0.127 26.593-0.001 53.149-5.851 78.073-17.479 44.892-20.945 78.816-57.977 95.522-104.274 1.356-3.759 2.603-7.597 3.706-11.406 9.463-32.667 6.019-65.426-9.585-93.739l46.72-21.7c3.083-1.432 5.449-4.057 6.554-7.271 1.105-3.211 0.855-6.736-0.695-9.761zm-70.216,135.395c-14.432,39.992-43.758,71.992-82.577,90.104-38.791,18.098-82.115,20.016-121.99,5.397-40.15-14.718-72.084-44.216-89.92-83.059-3.594-7.826-6.523-15.839-8.793-23.973 3.431,1.585 7.003,2.969 10.709,4.081 1.198,0.359 2.407,0.531 3.597,0.531 5.376,0 10.344-3.497 11.968-8.912 1.984-6.612-1.769-13.581-8.381-15.564-13.601-4.08-20.754-11.405-23.528-14.891-0.134-2.747-0.19-5.498-0.179-8.249 5.966,2.099 13.293,3.736 22.305,4.524 0.371,0.032 0.738,0.048 1.103,0.048 6.411,0 11.87-4.906 12.438-11.412 0.601-6.877-4.487-12.94-11.364-13.542-11.893-1.04-18.557-3.72-22.168-5.956 1.016-5.859 2.365-11.688 4.049-17.462 60.952,19.016 121.454,9.117 170.635-11.424 2.088,13.096 8.404,25.243 18.242,34.578 10.962,10.402 25.177,16.263 40.028,16.718 7.15,12.84 18.783,22.785 32.748,27.784 6.649,2.38 13.6,3.559 20.533,3.559 9.597,0 19.151-2.279 27.831-6.73-0.404,7.922-1.75,15.947-4.076,23.973-0.956,3.298-2.036,6.621-3.21,9.877zm-5.779-113.35c-3.379,1.569-5.881,4.564-6.826,8.168-0.944,3.604-0.232,7.441 1.942,10.466 7.496,10.427 12.69,21.854 15.53,33.853l-8.442,4.507c-9.07,4.847-19.397,5.607-29.079,2.141-9.689-3.469-17.193-10.617-21.115-20.092l-.71-1.73c-2.136-5.206-7.486-8.342-13.071-7.663-10.684,1.296-21.29-2.206-29.098-9.615-7.641-7.25-11.679-17.375-11.162-27.873 33.358-17.552 59.459-39.234 73.848-57.6 1.769-2.258 5.387-4.293 8.691-5.986 8.912-4.563 19.069-5.383 28.598-2.308s17.291,9.677 21.854,18.589l16.862,32.931-47.822,22.212z"></path> <path d="m337.942,59.989c-3.29,0-6.51,1.33-8.84,3.66-2.32,2.32-3.66,5.54-3.66,8.83s1.34,6.52 3.66,8.84c2.33,2.33 5.55,3.66 8.84,3.66s6.51-1.33 8.84-3.66c2.33-2.32 3.66-5.55 3.66-8.84s-1.33-6.51-3.66-8.83c-2.33-2.33-5.55-3.66-8.84-3.66z"></path> </g> </g></svg>
                                    </div>
                                    <span className='chicken-type'>{item.total_count === 0 ? "٠" : item.total_count.toLocaleString('ar')} فراخ بيضة</span>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            {/* Pagination */}
            <div className="flex justify-center">
                {renderPagination()}
            </div>
        </div>
    )
}