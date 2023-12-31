import "./MissionType.scss";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import closeIcon from "../../../../Assets/Icons/closeicon.svg";
import { useEffect, useState } from "react";
import API from "../../../../Api";
import { setSelectedMissionType } from "../../../../redux/Slices/MissionSlice";
type MissionTypeProps = {
  isEdit: boolean;
  typeId?: string;
};
export const MissionType = (props: MissionTypeProps) => {
  // const [searchResults, setSearchResults] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [changed, setIsChanged] = useState(false);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState<any[]>([{}]);
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
    API.get(`mission-types`).then((res) => {
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
    if (props.isEdit === true) {
      setIsChanged(true);
      setSelectedItemId(itemId !== Number(props.typeId) ? itemId : 0);
      setSelectedItemName(itemId !== Number(props.typeId) ? itemName : "null");
    } else {
      setSelectedItemId(itemId === selectedItemId ? 0 : itemId);
      setSelectedItemName(itemId === selectedItemId ? "null" : itemName);
    }
  };
  const submitChoise = () => {
    let typeId = selectedItemId;
    let typeName = selectedItemName;
    dispatch(setSelectedMissionType({ typeId, typeName }));
  };
  return (
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
                نوع المهمة
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
                اختر نوع المهمة
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
                              props.isEdit === true && changed === false
                                ? item.id === props.typeId
                                : item.id === selectedItemId
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
                  <div className="done" onClick={() => submitChoise()}>
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
  );
};
