const RecentActivity = ({ workouts }) => {
  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <h4 className="mb-3">Recent Workouts</h4>

        {workouts.length === 0 ? (
          <p className="text-muted">No workouts added yet.</p>
        ) : (
          <ul className="list-group">
            {workouts.slice(0, 5).map((workout) => (
              <li
                key={workout._id}
                className="list-group-item"
              >
                <strong>{workout.exercise}</strong>
                {" - "}
                {workout.caloriesBurned} kcal
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;