

function DeleteUser({token, setToken, setHabits, setFeed }){

    return (<button
    style={{
  background: "transparent",
  color: "#dc2626",
  border: "none",
  boxShadow: "none",
  padding: 0,
  fontWeight: "600",
}}
  onClick={async () => {
    const confirmDelete = window.confirm("Delete account permanently?");
    if (!confirmDelete) return;

    try {
      await fetch("https://consistency-tracker-zwqt.onrender.com/api/auth/delete", {
        method: "DELETE",
        headers: {

          "Content-Type": "application/json",
          Authorization :`Bearer ${token}`
         
               },
        
      });

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
    )
}
export default DeleteUser;

