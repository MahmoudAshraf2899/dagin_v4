import "./MissionRangePopUp.scss";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import closeIcon from "../../../../../Assets/Icons/closeicon.svg";
import API from "../../../../../Api";
import { setSelectedWorkAreas } from "../../../../../redux/Slices/MissionSlice";
type MissionRangePopUpProps = {
  isEdit: boolean;
  workAreas?: {}[];
};

export const MissionRangePopUp = (props: MissionRangePopUpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState<any[]>([{}]);
  const [workAreasIds, setWorkAreasIds] = useState<number[]>([]);
  const [workAreasNames, setWorkAreasNames] = useState<string[]>([]);
  const [groupedItems, setGroupedItems] = useState<Record<string, any>>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [result, setResult] = useState<any[]>([{}]);

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
          setData(res.data);
          setGroupedItems(grouped);
          setSearchResults(res.data);
          setIsLoading(false);
        }
      }
    });
  }, [setSearchResults]);

  const handleSearch = (event: any) => {
    setIsLoading(true);

    const { value } = event.target;

    if (value.length === 0) {
      setIsLoading(false);

      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    const grouped = items.reduce((grouped: Record<string, any>, item: any) => {
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

    setIsLoading(false);
  };
  const handleSelectRange = (cityId: number, cityName: string) => {
    const isSelectedBefore = workAreasIds.includes(cityId);

    if (isSelectedBefore) {
      const indexToRemove = workAreasIds.indexOf(cityId);
      const titleToRemove = workAreasNames.indexOf(cityName);
      // Remove the ID if it exists in the array
      if (indexToRemove !== -1 && titleToRemove !== -1) {
        workAreasIds.splice(indexToRemove, 1);
        workAreasNames.splice(indexToRemove, 1);
        setWorkAreasIds(workAreasIds);
        setWorkAreasNames(workAreasNames);
      } else {
        workAreasIds.push(cityId);
        workAreasNames.push(cityName);
        setWorkAreasIds(workAreasIds);
        setWorkAreasNames(workAreasNames);
      }
    } else {
      workAreasIds.push(cityId);
      workAreasNames.push(cityName);
      setWorkAreasIds(workAreasIds);
      setWorkAreasNames(workAreasNames);
    }
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
    if (workAreasNames.length > 1) {
      let cityName = workAreasNames[0];
      let count = workAreasNames.length - 1;
      let text = `${cityName} و ${count} أخري`;
      rangeTitle = text;
    }
    let rangeIds = cityValues
    let workAreaChanged = rangeIds.length > 0 ? true : false
    dispatch(setSelectedWorkAreas({ rangeIds, rangeTitle, workAreaChanged }));

  };
  return (
    <div className="MissionRangePopUp">
      <input className="modal-state" id="modal-9" type="checkbox" />
      <div className="modal w-full">
        <label className="modal-overlay" htmlFor="modal-9"></label>
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
                نطاق المهمة
              </h2>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4">
                <label htmlFor="modal-9">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.4993 17.5L14.166 14.1667" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                <label htmlFor="modal-9">
                  <div className="done" onClick={() => handleSubmitChoise()}>
                    تم
                  </div>
                </label>
                <label htmlFor="modal-9">
                  <div className="cancel">الغاء</div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
