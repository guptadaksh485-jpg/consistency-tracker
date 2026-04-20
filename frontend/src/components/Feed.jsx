function Feed({feed}){
return (<ul>
  {feed.map((f, index) => (
    <li key={index}>
      {f.habitId?.title} completed on{" "}
      {new Date(f.date).toLocaleDateString()}
    </li>
  ))}
</ul>)
}

export default Feed;