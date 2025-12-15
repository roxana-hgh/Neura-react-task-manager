import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function TaskItem(props) {
    const TaskCheckHandler = (checked) => {
        props.TaskCheckChange(props.task.id, checked);
    }
  return (
    <div className="px-2 py-3 border-b last-of-type:border-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={props.task.completed}
          id={`task-item${props.task.id}`}
          onCheckedChange={TaskCheckHandler}
        />
        <Label htmlFor={`task-item${props.task.id}`}>{props.task.title}</Label>
      </div>
    </div>
  );
}

export default TaskItem;
