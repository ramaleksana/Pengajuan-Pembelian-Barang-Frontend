import { ROLE_FINANCE, ROLE_MANAGER, ROLE_OFFICER } from "../../constant";
import { useAuth } from "../../context/AuthContext";
import ListPengajuanFinance from "./Finance/List";
import ListPengajuanManager from "./Manager/List";
import ListPengajuanOfficer from "./Officer/List";

const ListPengajuan = () => {
    const { role } = useAuth();
    if (role === ROLE_OFFICER) {
        return <ListPengajuanOfficer />;
    } else if (role === ROLE_MANAGER) {
        return <ListPengajuanManager />;
    } else if (role === ROLE_FINANCE) {
        return <ListPengajuanFinance />;
    } else {
        return <div></div>;
    }
};

export default ListPengajuan;
