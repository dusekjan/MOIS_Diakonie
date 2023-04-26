import {Link, useLocation, useNavigate} from "react-router-dom";
import Logo from "../images/diakonie-logo.png"
import {makeRequest} from "../utils/requests";

function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hide = window.location.pathname === "/login";

  const links = [
    { label: "Domov", path: "/" },
    { label: "Dary", path: "/donations" }
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link key={link.label} to={link.path}>
        {link.label}
      </Link>
    );
  });

  const handleLogOut = async (e) => {
    e.preventDefault()
    const response = await makeRequest(`/auth/logout/`)
    if (response.json_status === 200) {
        navigate("/login")
    }
  }

  renderedLinks.push(
      <Link key="logout" to="/logout" onClick={handleLogOut}>
        Odhlásit
      </Link>
  )

  const handleClick = () => {
    if (pathname !== "/") {
      navigate("/")
    }
  }

  return (
    <nav>
      <img id="main-logo" src={Logo} alt="Pizza Python Logo" onClick={handleClick} />
      <div id="nav-links">
        {hide || renderedLinks}
      </div>
    </nav>
  );
}

export default Navigation;
