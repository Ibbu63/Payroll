import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="admin-header">
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search employees, payroll, reports..."
        />
      </div>

      <div className="header-right">
        <FaBell className="icon" />

        <div className="profile">
          <FaUserCircle />
          <div>
            <strong>Admin</strong>
            <span>System Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
