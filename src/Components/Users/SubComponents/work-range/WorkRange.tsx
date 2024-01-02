import './WorkRange.scss'
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import closeIcon from "../../../../Assets/Icons/closeicon.svg";
import API from "../../../../Api";
import { setSelectedStage, setSelectedWorkAreas } from "../../../../redux/Slices/UsersSlice";

export const WorkRange = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any[]>([{}]);
    const [result, setResult] = useState<any[]>([{}]);
    const [searchResults, setSearchResults] = useState<any[]>([{}]);
    const [workAreasIds, setWorkAreasIds] = useState<number[]>([]);
    const [workAreasNames, setWorkAreasNames] = useState<string[]>([]);
    const [groupedItems, setGroupedItems] = useState<Record<string, any>>({});
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.2,
        keys: ["name"],
    };
    const fuse = new Fuse(searchResults, options);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);

        API.get(`work-areas`).then((res) => {
            if (res) {
                if (res.status === 403) {
                    toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
                } else {
                    setResult(res.data)
                    const grouped = res.data.reduce((grouped: Record<string, any>, item: any) => {
                        const { id, name, governorate } = item;
                        const governorateId = governorate.id;

                        if (!grouped[governorateId]) {
                            grouped[governorateId] = { governorate: governorate.name, items: [] };
                        }
                        const modifiedId = `${id}_city`;

                        grouped[governorateId].items.push({ id: modifiedId, name });

                        return grouped;
                    }, {});


                    setGroupedItems(grouped);
                    setSearchResults(grouped);
                    setData(grouped);
                    setIsLoading(false);
                }
            }
        });
    }, [setSearchResults]);
    const handleSearch = (event: any) => {
        const { value } = event.target;

        // If the user searched for an empty string,
        // display all data.
        if (value.length === 0) {
            setSearchResults(data);
            return;
        }

        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setSearchResults(items);
    };

    const handleSubmitChoise = () => {


        const cityValues = selectedItems
            .filter(value => value.includes('_city'))
            .map(value => value.replace('_city', ''));
        for (let index = 0; index < cityValues.length; index++) {
            const city = result.find((c) => c.id === cityValues[index]).name;
            workAreasNames.push(city);
        }
        let rangeTitle = workAreasNames[0];
        //Get First object from array
        if (workAreasNames.length > 0) {
            let cityName = workAreasNames[0];
            let count = workAreasNames.length - 1;
            let text = `${cityName} و ${count} أخري`;
            rangeTitle = text;
        }
        let rangeIds = cityValues
        dispatch(setSelectedWorkAreas({ rangeIds, rangeTitle }));
    };

    const handleItemToggle = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };


    const handleParentToggle = (governorateId: string) => {
        const itemsToAdd = groupedItems[governorateId]?.items.map((item: any) => item.id) || [];

        if (selectedItems.includes(governorateId)) {

            let newSelected = selectedItems.filter(item => item !== governorateId);

            setSelectedItems(newSelected.filter((id) => !itemsToAdd.includes(id)));
        } else {
            setSelectedItems([...selectedItems, ...itemsToAdd, governorateId]);
        }
    };

    return (
        <div className="WorkRange">
            <input className="modal-state" id="modal-784" type="checkbox" />
            <div className="modal w-full">
                <label className="modal-overlay" htmlFor="modal-784"></label>
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
                                نطاق العمل
                            </h2>
                        </div>
                        <div className="col-start-2 flex justify-end">
                            <div className="flex gap-4">
                                <label htmlFor="modal-784">
                                    <img src={closeIcon} alt="close" />
                                </label>
                            </div>
                        </div>
                        <div className="col-start-1 mt-4 mb-4 pr-4">
                            <div className="flex justify-start select-mission-type">
                                اختر المنطقة الجغرافية
                            </div>
                        </div>
                        <div className="col-span-full mb-4 pr-4 pl-4">
                            <div className="form-control relative w-full">
                                <input
                                    type="text"
                                    className="input input-lg max-w-full input-search"
                                    placeholder="ابحث"
                                    onChange={handleSearch}
                                />

                                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-content3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="col-span-full mb-4 pr-4 pl-4 h-40 overflow-y-auto">
                            <div className="types-list">
                                <ul className="list-none scrollable-list">
                                    {Object.entries(groupedItems).map(([governorateId, { governorate, items }]) => (
                                        <>
                                            <li
                                                key={governorateId}
                                                id={governorateId}
                                                className="flex justify-between pl-4 py-2"
                                            >
                                                <span className="list-text">{governorate}</span>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-bordered-success"
                                                    checked={selectedItems.includes(governorateId)}
                                                    onChange={() => handleParentToggle(governorateId)}
                                                />


                                                <ul className="list-none scrollable-list ">
                                                    {items.map((item: any) => (
                                                        <li
                                                            id={item.id}
                                                            key={item.id}
                                                            className="flex justify-between pl-4 py-2"
                                                        >
                                                            <span className="list-text">{item.name}</span>
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox checkbox-bordered-success"
                                                                    checked={selectedItems.includes(item.id)}
                                                                    onChange={() => handleItemToggle(item.id)}
                                                                />
                                                            </div>

                                                        </li>
                                                    ))}
                                                </ul>

                                            </li>
                                            <div className="divider"></div>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-full mb-4">
                            <div className="divider"></div>
                        </div>
                        <div className="col-span-full">
                            <div className="flex actions gap-4">
                                <label htmlFor="modal-784">
                                    <div className="done" onClick={() => handleSubmitChoise()}>
                                        تم
                                    </div>
                                </label>
                                <label htmlFor="modal-784">
                                    <div className="cancel">الغاء</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}