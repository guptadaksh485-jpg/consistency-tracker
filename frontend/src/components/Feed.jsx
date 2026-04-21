function Feed({feed}){
return (<ul style={{ paddingLeft: "20px" }}>
  {feed.map((f, index) => (
    <li key={index} style={{ marginBottom: "5px" }}>
      {f.habitId?.title} ✔ on{" "}
      {new Date(f.date).toLocaleDateString()}
    </li>
  ))}
</ul>)
}

export default Feed;