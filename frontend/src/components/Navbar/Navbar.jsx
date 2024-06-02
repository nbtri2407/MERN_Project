import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { Navlinks, menuItem } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import { setFilter } from "../../store/filterSlice";
import Context from "../../context";
import scrollTop from "../../helper/scrollTop";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const context = useContext(Context);
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state?.user?.user); 
  const state = useSelector((state) => state);
  const filters = state.filter;

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout.url, {
      method: "get",
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.status) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigator("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleSearchChange = (e) => {
    navigator(`/shop/`);
    dispatch(setFilter({ filterName: "search", value: e.target.value }));
  };

  useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 lg:px-0 py-10">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"} onClick={() => {handleMenuClick("/"); scrollTop()}}>
              <h1 className="text-5xl lg:text-3xl font-bold text-primary">
                ViVid
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex items-center gap-10 text-xl xl:text-2xl">
              {Navlinks.map((item) => (
                <li
                  className={
                    activeMenuItem === item.link
                      ? "underline text-primary"
                      : "hover:text-primary transition-all"
                  }
                  key={item.id}
                >
                  <Link
                    to={item.link}
                    onClick={() => {handleMenuClick(item.link); scrollTop()}}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex gap-20 lg:gap-2 rounded-lg items-center bg-slate-100 text-xl px-4">
            <input
              className="pr-12 py-2 bg-slate-100 border-none outline-none"
              type="text"
              placeholder="Search"
              value={filters?.search}
              onChange={handleSearchChange}
            />
            <IoSearch className="cursor-pointer" />
          </div>
          <div>
            <div className="hidden xl:flex gap-6 items-center text-4xl">
              <div>
                <FaRegHeart className="iconcss" />
              </div>
              <Link to={user ? "/cart" : "/login"} className="relative">
                <IoCartOutline className="iconcss" />
                {user && (
                  <p className="absolute -top-2 -right-2 text-base bg-primary text-white rounded-full px-2">
                    {context.cartProductCount}
                  </p>
                )}
              </Link>
              <div className="flex gap-1 items-center relative">
                <FaRegUser
                  className="iconcss"
                  onMouseEnter={() => setShowMenu(true)}
                  onMouseLeave={() => setShowMenu(false)}
                />
                {user === null ? (
                  <p className="hover:underline text-primary transition-all text-xl">
                    (<Link to={"/login"}>Login</Link>)
                  </p>
                ) : (
                  <p className="text-xl">{user.name}</p>
                )}

                {showMenu && user !== null && (
                  <div
                    className="absolute top-[100%] z-10 border bg-slate-100 shadow-2xl py-2 text-xl flex flex-col gap-2 before-triangle"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                  >
                    {user?.role === "ADMIN" && (
                      <Link
                        to="/admin-dashboard"
                        className="pl-2 pr-12 py-1  hover:bg-primary hover:text-white transition-all"
                      >
                        Dashboard
                      </Link>
                    )}
                    {menuItem.map((item) => (
                      <Link
                        to={item.link}
                        key={item.id}
                        className="pl-2 pr-12 py-1  hover:bg-primary hover:text-white transition-all"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <p
                      className="pl-2 pr-12 py-1  hover:bg-primary hover:text-white transition-all cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="block xl:hidden text-5xl">
              <IoMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
