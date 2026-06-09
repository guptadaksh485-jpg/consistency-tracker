

function DeleteUser({userId, setUserId, setHabits, setFeed }){

    return (<button
  style={{ marginTop: "10px", color: "red" }}
  onClick={async () => {
    const confirmDelete = window.confirm("Delete account permanently?");
    if (!confirmDelete) return;

    try {
      await fetch("http://localhost:5000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      localStorage.removeItem("userId");
      setUserId(null);
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

