import styles from "./header.module.scss";
// import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyHeader() {
  const [user, setUser] = useState(null);
  const router = useNavigate();
  // let user;
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(JSON.parse(userInfo));
    console.log('userInfo', user)
  }, []);
  const handleLogout = () => {
    logout();
    router("/login");
  };
  const logout = async () => {
    try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
  return (
    <div className={styles.root}>
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <img
          src="/assets/codingImg.jpeg"
          width={90}
          height={50}
          style={{ cursor: "pointer", borderRadius: "8px" }}
        />
        <h1>My Crud</h1>
      </Link>
      <ul className={styles._ul}>
        <li className={styles.listItem}>
          <Link className={styles.active} to="/">
            Home
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/my-properties">My Properties</Link>
        </li>
        {/* <li className={styles.listItem}><Link to="/my-properties">My Properties</Link></li> */}
        <li className={styles.listItem}>
          <Link to="/add-property">Add your Property</Link>
        </li>
      </ul>

      {user ? (
        <div className={styles.rightContentBox}>
          <li>
            Welcome <b>{user?.firstName}</b>
          </li>
          <div onClick={handleLogout} className={styles.buttonBox}>
            Logout
          </div>
        </div>
      ) : (
        <div className={styles.buttonBox}>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
