import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from ".";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAdmin } from "../../../actions";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admin);
  console.log(admin);
  useEffect(() => {
    dispatch(checkAuthAdmin(navigate));
  }, []);
  return (
    <>
      <Outlet></Outlet>
      <AdminNav></AdminNav>
    </>
  );
};

export default AdminLayout;
