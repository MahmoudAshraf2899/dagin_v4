import { Login } from "../Components/Login/Login";
import { AddMission } from "../Components/Missions/AddMission/AddMission";
import { PendingMission } from "../Components/Missions/PendingMission/PendingMission";
import { Competitions } from "../Pages/Competitions/Competitions";
import { FarmDetailsPage } from "../Pages/Farms/FarmDetailsPage";
import { FarmsPage } from "../Pages/Farms/FarmsPage";
import { MainPage } from "../Pages/MainPage/MainPage";
import { AddMissionPage } from "../Pages/Missions/AddMissionPage";
import { EditMissionPage } from "../Pages/Missions/EditMissionPage";
import { MissionsPage } from "../Pages/Missions/MissionsPage";
import { AddUserPage } from "../Pages/Users/AddUserPage";
import { EditUserPage } from "../Pages/Users/EditUserPage";
import { UserProfilePage } from "../Pages/Users/UserProfilePage";
import { Users } from "../Pages/Users/Users";
import { SettlementWalletsPage } from "../Pages/Wallets/SettlementWalletsPage";
import { Wallets } from "../Pages/Wallets/Wallets";
import { AuthProvider, useAuth } from "./auth";
import { Route, Routes } from "react-router-dom";

export const Views = () => {
    const auth = useAuth();
    return (
        <AuthProvider>
            <Routes>
                {!auth?.user && <Route path="/login" element={<Login />} />}
                <Route path="/Home" element={<MainPage />} />
                <Route path="/Missions" element={<MissionsPage />}></Route>
                <Route path="/Missions/Add" element={<AddMissionPage />} />
                <Route path="/Missions/Edit/:MissionId" element={<EditMissionPage />} />
                <Route path="/Exams" element={<MainPage />}></Route>
                <Route path="/Farmers" element={<FarmsPage />}></Route>
                <Route path="/Farmers/:farmId" element={<FarmDetailsPage />} />
                <Route path="/Competitions" element={<Competitions />}></Route>
                <Route path="/Courses" element={<MainPage />}></Route>
                <Route path="/Users" element={<Users />}></Route>
                <Route path="/Users/Add" element={<AddUserPage />} />
                <Route path="/Users/Edit/:userId" element={<EditUserPage />} />
                <Route path="/Users/Profile/:userId" element={<UserProfilePage />} />
                <Route path="/Wallets" element={<Wallets />}></Route>
                <Route path="/Wallets/Settlement/:userId" element={<SettlementWalletsPage />} />

                <Route path="/Reports" element={<MainPage />}></Route>
                <Route path="/Settings" element={<MainPage />}></Route>
                <Route path="/NotificationSettings" element={<MainPage />}></Route>
                <Route path="*" element={<Login />} />

            </Routes>
        </AuthProvider>
    )

}