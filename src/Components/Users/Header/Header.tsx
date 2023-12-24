import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedUsersType, toggleShowAddUser } from "../../../redux/Slices/UsersSlice";
import './Header.scss'

export const Header = ()=>{
    const dispatch = useDispatch();

    const [activeElement, setActiveElement] = useState(1);
    const handleActiveElement = (id: number) => {
        setActiveElement(id);
        let type = id;
          dispatch(selectedUsersType({ type }));
      };
      const showAddUser = ()=>{
        let visible= true;
        dispatch(toggleShowAddUser({visible}))
      }
    return (
        <div className="grid grid-cols-2 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4  Header">
  
        
        <div className="col-start-1 flex  sm:col-start-1">
            <div
             onClick={() => handleActiveElement(1)}
             className={
               activeElement === 1 ? "main-element-active" : "main-element"
             }
             >
                 حسابات مفعلة
           </div>
           <div
        onClick={() => handleActiveElement(2)}
        className={
          activeElement === 2 ? "main-element-active" : "main-element"
        }
      >
        حسابات غير مفعلة
      </div>
        </div>
        <div className="col-start-2  flex justify-end">
        <div className="flex">
         
        {/* Add Button */}
        <div className="add-user-btn" 
        onClick={() => showAddUser()}
       
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M10.5049 1.02539C6.02189 1.02539 2.375 4.67228 2.375 9.15527C2.375 13.6383 6.02189 17.2852 10.5049 17.2852C14.9879 17.2852 18.6348 13.6383 18.6348 9.15527C18.6348 4.67228 14.9879 1.02539 10.5049 1.02539ZM14.0617 9.83272H11.1823V12.7121C11.1823 13.0861 10.8789 13.3895 10.5049 13.3895C10.1309 13.3895 9.82743 13.0861 9.82743 12.7121V9.83272H6.94806C6.57404 9.83272 6.27061 9.52929 6.27061 9.15527C6.27061 8.78126 6.57404 8.47782 6.94806 8.47782H9.82743V5.59845C9.82743 5.22443 10.1309 4.921 10.5049 4.921C10.8789 4.921 11.1823 5.22443 11.1823 5.59845V8.47782H14.0617C14.4357 8.47782 14.7392 8.78126 14.7392 9.15527C14.7392 9.52929 14.4357 9.83272 14.0617 9.83272Z"
              fill="white"
            />
          </svg>
          اضافة حساب
        </div>
      </div>
        </div>
       
        </div>

    )
}