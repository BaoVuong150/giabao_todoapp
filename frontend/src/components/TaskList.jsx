import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
const TaskList = ({ TaskFilters, filters, handleTaskChanged }) => {
  if (!TaskFilters || TaskFilters.length == 0) {
    return <TaskEmptyState filter={filters} />;
  }
  return (
    <div className="space-y-3">
      {TaskFilters.map((task, index) => (
        <TaskCard key={task.id ?? index} task={task} index={index} handleTaskChanged={handleTaskChanged}/>
      ))}
    </div>
  );
};

export default TaskList;
