

function DeleteUser({token, setToken, setHabits, setFeed }){

    return (<button
    className="
    mt-5
text-red-600
hover:text-red-700
font-medium
underline-offset-2
hover:underline
bg-transparent
p-0
shadow-none 
"
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

