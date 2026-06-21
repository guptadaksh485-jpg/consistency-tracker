import * as api from "../api";

function DeleteUser({ setToken, setHabits, setFeed }) {
  return (
    <button
      className="mt-5 text-red-600 hover:text-red-700 font-medium underline-offset-2 hover:underline bg-transparent p-0 shadow-none"
      onClick={async () => {
        const confirmDelete = window.confirm("Delete account permanently?");
        if (!confirmDelete) return;
        try {
          await api.deleteAccount();
          localStorage.removeItem("token");
          setToken(null);
          setHabits([]);
          setFeed([]);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      Delete Account
    </button>
  );
}
export default DeleteUser;