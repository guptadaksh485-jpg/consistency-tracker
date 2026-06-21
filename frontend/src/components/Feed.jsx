function Feed({ feed }) {
  return (
    <div className="space-y-2">
      {feed.map((log) => (
        <div
          key={log._id}
          className="border-b border-slate-100 py-2"
        >
          <p className="font-medium">
            {log.habitId?.title || "Habit"}
          </p>

          <p className="text-sm text-slate-500">
            Completed on{" "}
            {new Date(log.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Feed;