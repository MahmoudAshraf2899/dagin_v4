import "./MissionAssignPopUp.scss";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import closeIcon from "../../../../../Assets/Icons/closeicon.svg";
import { useEffect, useState } from "react";
import API from "../../../../../Api";
import { setSelectedAssignTo } from "../../../../../redux/Slices/MissionSlice";
import { Loading } from "../../../../Loading/Loading";
export const MissionAssignPopUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState<any[]>([{}]);
  const [activeType, setActiveType] = useState(1);
  const [selectedSales, setSelectedSales] = useState<number[]>([]);
  const [selectedNameSales, setSelectedNameSales] = useState<string[]>([]);
  const [selectedNameSpecialties, setSelectedNameSpecialties] = useState<
    string[]
  >([]);

  const [selectedspecialties, setSelectedspecialties] = useState<number[]>([]);
  const [url, setUrl] = useState("salesman");
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["name"],
  };
  const fuse = new Fuse(searchResults, options);

  const dispatch = useDispatch();
  const handleActiveType = (id: number) => {
    setSelectedNameSpecialties([]);
    setSelectedspecialties([]);
    setSelectedSales([]);
    setSelectedNameSales([]);
    setActiveType(id);
  };
  useEffect(() => {
    setIsLoading(true);
    if (activeType === 1) {
      setUrl("salesman");
    } else {
      setUrl("specialties");
    }
    API.get(activeType === 1 ? "salesman" : "specialties").then((res) => {
      if (res) {
        if (res.status === 403) {
          toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
        } else {
          if (activeType === 1) {
            setSearchResults(res.data.items);
            setData(res.data.items);
          } else {
            setSearchResults(res.data);
            setData(res.data);
          }
          setIsLoading(false);
        }
      }
    });
  }, [setSearchResults, setActiveType, activeType, url]);
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
  const handleSelectItem = (id: number, name: string) => {
    if (activeType === 1) {
      //اشخاص
      const isSelectedBefore = selectedSales.includes(id);
      const isNameSelectedBefore = selectedNameSales.includes(name);
      if (isSelectedBefore || isNameSelectedBefore) {
        const indexToRemove = selectedSales.indexOf(id);
        const nameToRemoveIndex = selectedNameSales.indexOf(name);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1 && nameToRemoveIndex !== -1) {
          selectedSales.splice(indexToRemove, 1);
          selectedNameSales.splice(nameToRemoveIndex, 1);
          setSelectedSales(selectedSales);
          setSelectedNameSales(selectedNameSales);
        }
      } else {
        selectedSales.push(id);
        selectedNameSales.push(name);
        setSelectedSales(selectedSales);
        setSelectedNameSales(selectedNameSales);
      }
    } else {
      const isSelectedBefore = selectedspecialties.includes(id);
      const isNameSelectedBefore = selectedNameSpecialties.includes(name);

      if (isSelectedBefore || isNameSelectedBefore) {
        const indexToRemove = selectedspecialties.indexOf(id);
        const nameIndexToRemove = selectedNameSpecialties.indexOf(name);
        // Remove the ID if it exists in the array
        if (indexToRemove !== -1 && nameIndexToRemove !== -1) {
          selectedspecialties.splice(indexToRemove, 1);
          selectedNameSpecialties.splice(nameIndexToRemove, 1);
          setSelectedspecialties(selectedspecialties);
          setSelectedNameSpecialties(selectedNameSpecialties);
        }
      } else {
        selectedspecialties.push(id);
        selectedNameSpecialties.push(name);
        setSelectedspecialties(selectedspecialties);
        setSelectedNameSpecialties(selectedNameSpecialties);
      }
    }
  };
  const handleSubmitChoise = () => {
    let assignedIds = activeType === 1 ? selectedSales : selectedspecialties;
    let assignedType = activeType === 1 ? "اشخاص" : "تخصصات";
    let assignedText = "";
    //Get First object from array
    if (selectedNameSales.length > 0 && activeType === 1) {
      let cityName = selectedNameSales[0];
      let count = selectedNameSales.length - 1;
      if (count === 0) {
        assignedText = `${cityName} `;
      } else {
        assignedText = `${cityName} و ${count} أخري`;
      }
    } else {
      let cityName = selectedNameSpecialties[0];
      let count = selectedNameSpecialties.length - 1;
      let text = `${cityName} و ${count} أخري`;
      assignedText = text;
    }
    dispatch(setSelectedAssignTo({ assignedIds, assignedType, assignedText }));
  };
  return (
    <div className="MissionAssignPopUp">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      <input className="modal-state" id="modal-10" type="checkbox" />
      <div className="modal w-full">
        <label className="modal-overlay" htmlFor="modal-10"></label>
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
                تعيين المهمة ل
              </h2>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4">
                <label htmlFor="modal-10">
                  <img src={closeIcon} alt="close" />
                </label>
              </div>
            </div>
            <div className="col-start-1 mt-4 mb-4 pr-4">
              <div className="flex justify-start gap-4">
                <div
                  className={
                    activeType === 1 ? "assign-type-active" : "assign-type"
                  }
                  onClick={() => handleActiveType(1)}
                >
                  لحسابات اشخاص
                </div>
                <div
                  className={
                    activeType === 2 ? "assign-type-active" : "assign-type"
                  }
                  onClick={() => handleActiveType(2)}
                >
                  لتخصص
                </div>
              </div>
            </div>
            <div className="col-start-1 mt-4 mb-4 pr-4">
              <div className="flex justify-start select-mission-type">
                {activeType === 1
                  ? "اضف الاشخاص"
                  : activeType === 2
                  ? "اختر التخصصات"
                  : "اختر المنطقة الجغرافية"}
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
                  {searchResults.map((item) => {
                    return (
                      <li className="flex justify-between pl-4 py-2">
                        <span className="list-text">{item.name}</span>
                        <div>
                          <input
                            id={`checkbox ${item.id}`}
                            type="checkbox"
                            className="checkbox checkbox-bordered-success"
                            onChange={(e) =>
                              handleSelectItem(item.id, item.name)
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
                <label htmlFor="modal-10">
                  <div className="done" onClick={() => handleSubmitChoise()}>
                    تم
                  </div>
                </label>
                <label htmlFor="modal-10">
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
