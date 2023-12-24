import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import closeIcon from "../../../../Assets/Icons/closeicon.svg";
import API from "../../../../Api";
import { setSelectedStage } from "../../../../redux/Slices/UsersSlice";

export const Stages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState<any[]>([{}]);
    const [selectedItemId, setSelectedItemId] = useState(0);
    const [selectedItemName, setSelectedItemName] = useState("");
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
        API.get(`levels`).then((res) => {
            if (res) {
                if (res.status === 403) {
                    toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
                } else {
                    setSearchResults(res.data);
                    setData(res.data);
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
    const handleChangeType = (itemId: number, itemName: string) => {

        setSelectedItemId(itemId === selectedItemId ? 0 : itemId);
        setSelectedItemName(itemId === selectedItemId ? "null" : itemName);

    };

    const submitChoise = () => {
        let levelId = selectedItemId;
        let levelName = selectedItemName;
        dispatch(setSelectedStage({ levelId, levelName }));
    };


    return (
        <div className="StagesPopUp">
            <div className="MissionType">
                <input className="modal-state" id="modal-8" type="checkbox" />
                <div className="modal w-full">
                    <label className="modal-overlay" htmlFor="modal-8"></label>
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
                                    المرحلة
                                </h2>
                            </div>
                            <div className="col-start-2 flex justify-end">
                                <div className="flex gap-4">
                                    <label htmlFor="modal-8">
                                        <img src={closeIcon} alt="close" />
                                    </label>
                                </div>
                            </div>
                            <div className="col-start-1 mt-4 mb-4 pr-4">
                                <div className="flex justify-start select-mission-type">
                                    اختر المرحلة
                                </div>
                            </div>
                            <div className="col-span-full mb-4 pr-4 pl-4">
                                <div className="form-control relative w-full">
                                    <input
                                        type="text"
                                        className="input input-lg max-w-full input-search"
                                        onChange={handleSearch}
                                        placeholder="ابحث"
                                    />

                                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17.4993 17.5L14.166 14.1667" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-full mb-4 pr-4 pl-4 h-32">
                                <div className="types-list">
                                    <ul className="list-none scrollable-list">
                                        {searchResults.map((item) => {
                                            return (
                                                <li className="flex justify-between pl-4 py-2">
                                                    <span className="list-text">{item.name}</span>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-bordered-success"
                                                            onChange={() =>
                                                                handleChangeType(item.id, item.name)
                                                            }
                                                            checked={
                                                                item.id === selectedItemId
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-full mb-4">
                                <div className="divider"></div>
                            </div>
                            <div className="col-span-full">
                                <div className="flex actions gap-4">
                                    <label htmlFor="modal-8">
                                        <div className="done"
                                            onClick={() => submitChoise()}
                                        >
                                            تم
                                        </div>
                                    </label>
                                    <label htmlFor="modal-8">
                                        <div className="cancel">الغاء</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}