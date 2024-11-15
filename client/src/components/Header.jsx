import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useEffect, useState } from "react";
import Headroom from "react-headroom";
import { DropDownMenu } from "./DropDownMenu";
import { useRef } from "react";
import { Popover } from "flowbite-react";
import { MdOutlineClear } from "react-icons/md";

export function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, SetOpen] = useState(false);
  const searchref = useRef();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetOpen(false);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Headroom>
      <Navbar className="w-full backdrop-blur flex-none transition-colors duration-500  border border-b-slate-500 rounded-bl-lg rounded-br-lg bg-slate-300 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/25">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xs  font-semibold dark:text-white"
        >
          <span className=" px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white">
            Comrade
          </span>
          Trends
        </Link>
        <Popover
          className="flex h-auto items-center justify-center mt-6"
          aria-labelledby="default-popover"
          open={open}
          onOpenChange={SetOpen}
          content={
            <form className="w-full backdrop-blur flex-none transition-colors duration-500  border border-b-slate-500 rounded-bl-lg rounded-br-lg bg-slate-300 supports-backdrop-blur:bg-white/95 h-64 rounded-lg dark:bg-slate-900/95">
              <div className="flex mx-2 items-center gap-2 justify-center">
                <Button.Group className="flex mt-2 w-full justify-start gap-0 items-center">
                  <input
                    className="rounded-3xl w-full bg-slate-300 h-10 rounded-r-none dark:bg-slate-800 md:w-96"
                    placeholder="Search..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="w-12 border flex justify-center items-center border-gray-500 rounded-lg rounded-l-none border-l-0 dark:bg-slate-800 h-10">
                    <MdOutlineClear
                      onClick={() => setSearchTerm("")}
                      className="w-5 h-5"
                    />
                  </div>
                </Button.Group>
                <div className=" mt-2 flex items-center">
                  <button
                    type="submit"
                    className="border  dark:bg-slate-800 border-slate-500 h-10 w-10 flex  justify-center items-center rounded-2xl"
                    onClick={handleSubmit}
                  >
                    <AiOutlineSearch className="w-5 hover:cursor-pointer  h-5" />
                  </button>
                </div>
              </div>
            </form>
          }
          arrow={false}
        >
          <div className="absolute left-1/2">
            <div ref={searchref}></div>
          </div>
        </Popover>
        <div className="flex gap-2 items-center sm:flex-row-reverse">
          <div className="flex  justify-start gap-2 items-center">
            <div className=" flex justify-between items-center gap-2 md:order-2">
              {path === "/search" ? (
                <div></div>
              ) : (
                <div>
                  <AiOutlineSearch
                    onClick={() => SetOpen(!open)}
                    className="w-5 hover:cursor-pointer sm:mx-4 h-5 text-slate-400"
                  />
                </div>
              )}
              <Button
                color="gray"
                className="w-9 h-9 focus:ring-0"
                pill
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "dark" ? <FaMoon /> : <FaSun />}
              </Button>
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User"
                      img={currentUser.profilePicture}
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      @{currentUser.username}
                    </span>
                    <span className="block text-sm font-medium truncate">
                      @{currentUser.email}
                    </span>
                  </Dropdown.Header>
                  {currentUser && currentUser.isAdmin && (
                    <>
                      <Link to={"/dashboard?tab=dash"}>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                    </>
                  )}
                  <Link to={"/dashboard?tab=profile"}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown>
              ) : (
                <Link to="sign-in">
                  <Button
                    className="focus:ring-0"
                    gradientDuoTone="purpleToBlue"
                    outline
                  >
                    SignIn
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden hover:cursor-pointer">
              <DropDownMenu />
            </div>
          </div>
          <Navbar.Collapse className="">
            <Navbar.Link active={path === "/"} as={"div"}>
              <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
              <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/contacts"} as={"div"}>
              <Link to="/contacts">Contacts</Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Headroom>
  );
}
