import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarProfile from "./components/NavbarProfile";
import { ReactComponent as MenuMobileIcon } from "../../assets/icons/mobile-menu.svg";
import { SIDEBAR_ACTION_TYPE } from "../../redux/actions-type";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const openSidebarFunc = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: true });
  };
  const {openSidebar} = useSelector(state=>state.openSidebar);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/groups/current":
        return "Qruplar";
      case "/groups/waiting":
        return "Qruplar";
      case "/workers":
        return "Əməkdaşlar";
      case "/students":
        return "Tələbələr";
      case "/teachers":
        return "Təlimçilər";
      case "/teachers/mentors":
        return "Təlimçilər";
      case "/courses":
        return "Fənlər";
      case "/tuition-fee":
        return "Təhsil haqqı";
      case "/career":
        return "Karyera";
      case "/consultation/appointed":
        return "Konsultasiya";
      case "/consultation/completed":
        return "Konsultasiya";
      case "/syllabus":
        return "Sillabus";
      case "/sales":
        return "Satış";
      case "/":
      case "/lessonTable":
        return "Dərs cədvəli";
      case "/event":
        return "Tədbirlər";
      case "/dashboard":
        return "İdarəetmə paneli";
      default:
        return "";
    }
  };
  const pageTitle = getPageTitle(location.pathname);

  return (
    <>
      <header className={`main-header ${openSidebar ? "open" :""} `  } >
        <div className="container">
          <div className="header-content">
            <div className="header-content-container">
              <div className="header-context">
                <MenuMobileIcon onClick={openSidebarFunc} />
                <h2>{pageTitle}</h2>
              </div>
              <div className="header-icons">
                <NavbarProfile />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
