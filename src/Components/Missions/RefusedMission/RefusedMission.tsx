import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RefusedMissions.scss";
import userIcon from "../../../Assets/Icons/user.jpeg";
import API from "../../../Api";
import { Loading } from "../../Loading/Loading";
import { toast } from "react-toastify";
import {
  sendMissionIdToPopUp,
  showDetailsPopUp,

} from "../../../redux/Slices/MissionSlice";
import moment from "moment";
import { setMainHeaderName } from "../../../redux/Slices/MainHeaderSlice";
export const RefusedMission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const ShowMissionDetailsPopUp = (missionId: number) => {
    dispatch(sendMissionIdToPopUp({ missionId }));
    let isDetailsActive = true;
    dispatch(showDetailsPopUp({ isDetailsActive }));
  };
  useEffect(() => {
    let mainHeaderName = "المهام";
    dispatch(setMainHeaderName({ mainHeaderName }));
    setIsLoading(true);
    API.get(
      `dashboard/missions?status=rejected&sort_by=id&sort_order=DESC&page=${pageNumber}&limit=${pageSize}`
    ).then((res) => {
      if (res) {
        if (res.status === 403) {
          toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
          setIsLoading(false);

        } else {
          setData(res.data.items);
          setTotalRows(res.data.totalCount);
          setIsLoading(false);
        }
      }
    });
  }, [setData]);
  const hanldeChangePage = (targetPN: number) => {
    setIsLoading(true);
    API.get(
      `dashboard/missions?status=rejected&sort_by=id&sort_order=DESC&page=${targetPN}&limit=${pageSize}`
    ).then((res) => {
      if (res) {
        if (res.status === 403) {
          toast.error(" عفوا انت ليس لديك صلاحية الوصول لهذه الصفحة ");
        } else {
          setData(res.data.items);
          setTotalRows(res.data.totalCount);
          setPageNumber(targetPN);
          setIsLoading(false);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
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
      <div className="pagination w-full max-w-xs overflow-auto">
        {paginationItem}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 my-4 RefusedMissions">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}
      {data.map((item: any) => {
        const createdAtDate = moment(item.created_at);
        const dueDate = moment(item.due_at == null ? new Date() : item.due_at);

        // Set the locale to Arabic
        moment.locale("ar");
        const createdAtDate_Arabic = createdAtDate.format("DD MMM YYYY");
        const dueDate_Arabic = dueDate.format("DD MMMM YYYY");
        return (
          <div className="grid grid-cols-2 mission-content">

            <div className="col-start-1">
              <span className="mission-type">
                {item.type != null ? item.type.name : ""}
              </span>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="popover" style={{ backgroundColor: "white" }}>
                <svg
                  className="popover-trigger arrow"
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
                  className="popover-content popover-bottom-left"
                  tabIndex={0}
                >
                  <ul>
                    <label
                      className="three-dots-li"
                      htmlFor="modal-1"
                      onClick={() => ShowMissionDetailsPopUp(item.id)}
                    >
                      عرض المهمة
                    </label>
                    <input
                      className="modal-state"
                      id="modal-1"
                      type="checkbox"
                    />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-start-1">
              <span className="mission-address">{item.name}</span>
            </div>
            <div className="col-start-2"></div>
            <div className="col-start-1">
              <div className="flex gap-4">
                <div className="mission-reward">السعر {item.reward} جنيه</div>
                <div className="created-at">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                    <path
                      d="M1.875 6.125H13.125"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 1.75L5 3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 1.75V3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                  </svg>
                  انشئت في : {createdAtDate_Arabic}
                </div>

                <div className="created-at">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      d="M1.875 6.6875C1.875 4.47836 3.66586 2.6875 5.875 2.6875H9.125C11.3341 2.6875 13.125 4.47836 13.125 6.6875V10.25C13.125 12.4591 11.3341 14.25 9.125 14.25H5.875C3.66586 14.25 1.875 12.4591 1.875 10.25V6.6875Z"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                    />
                    <path
                      d="M1.875 6.125H13.125"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 1.75L5 3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 1.75V3.625"
                      stroke="#9BA0B1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="7.5" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="10" cy="9.875" r="0.625" fill="#9BA0B1" />
                    <circle cx="5" cy="9.875" r="0.625" fill="#9BA0B1" />
                  </svg>
                  تنتهي في : {dueDate_Arabic}
                </div>
              </div>
            </div>
            <div className="col-start-2 flex justify-end">
              <div className="flex gap-4 mission-status">
                <div className="inprogress">مهمة مرفوضة</div>
                {item.salesman != null || item.salesman !== undefined ? (
                  <>
                    <div className="flex gap-4 assigned-to">
                      <div>
                        <img src={userIcon} alt="user" />
                      </div>
                      <div className=" flex gap-1">
                        <span className="assigned-to-txt">اسند لي:</span>
                        <span className="assinged-user-name">
                          {item.salesman.name}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="col-start-1">
              <div className="mission-history">
                اخر تعديل تم بواسطة : Mahmoud ELnabwy
              </div>
            </div>
          </div>
        );
      })}
      {/* Pagination */}
      <div className="flex justify-center">
        {renderPagination()}
      </div>
    </div>
  );
}