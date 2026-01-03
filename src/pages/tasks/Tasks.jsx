import AddNewTask from "@/features/tasks/components/AddTask";
import TasksList from "@/features/tasks/components/TasksList";

function Tasks() {
  return (
    <div className="tasks-page">
      
      {/* <div className="py-3 px-1 mb-3 w-full border-b">
        <AddNewTask />
      </div> */}
      <div className=" mb-3 px-1">
        <h3 className="font-bold text-xl mb-1">Your Tasks</h3>
        <p className="text-neutral-700 text-sm">Here's a list of your tasks</p>
        
      </div>
      <TasksList />
    </div>
  );
}

export default Tasks;
