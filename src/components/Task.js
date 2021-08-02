import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import useOutsideClick from "../hooks/useOutsideClick";
import moment from "moment";
import { RiCloseFill, RiStarSFill, RiStarSLine } from "react-icons/ri";
import {
  Checkbox,
  DaysContainer,
  EditInput,
  OptionContainer,
  TaskContainer,
  TaskTitleContainer,
} from "../pages/styles";

const Task = ({ task }) => {
  const { completeTask, removeTask, toggleStar, editTask } =
    useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(task.title);

  const handleEdit = (e) => {
    setEdit(e.target.value);
  };

  const editRef = useRef(null);

  const handleOnClickEdit = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      editRef.current.focus();
    }
  }, [isEdit]);

  const editKeyDown = (e) => {
    // stops edit when enter is hit in edit input.
    if (e.key === "Enter") {
      if (edit === "" || /^\s*$/.test(edit)) {
        // check input
        console.log("Invalid edit");
        return;
      }
      setEdit(edit); //change value of edit,
      setIsEdit(false); // set edit attribute to false,
      editTask(task.id, edit); // update the task globally.
    }
  };

  //Issue: clicking anohter task when editing
  useOutsideClick(editRef, () => {
    // stops edit when clicked outside of edit input.
    if (edit === "") {
      // if left blank, delete task
      removeTask(task.id);
    } else {
      // update task
      editTask(task.id, edit);
    }
  });

  var untilScheduleDate = moment(task.scheduleDate).fromNow();
  var untilDueDate = moment(task.dueDate).fromNow();

  console.log("In Task.js task.id:", task.id);

  return (
    <TaskContainer key={task.id}>
      <Checkbox type="Checkbox" onClick={() => completeTask(task.id)} />
      <TaskTitleContainer onClick={handleOnClickEdit}>
        {isEdit ? (
          <EditInput
            placeholder="Press enter to confirm edit"
            value={edit}
            onChange={handleEdit}
            onKeyDown={editKeyDown}
            ref={editRef}
          />
        ) : (
          <div>{edit}</div>
        )}
      </TaskTitleContainer>
      <DaysContainer>
        <p>{task.scheduleDate && <span>Scheduled {untilScheduleDate}</span>}</p>
        <p>{task.dueDate && <span>due {untilDueDate}</span>}</p>
      </DaysContainer>

      <OptionContainer>
        {task.star ? (
          <RiStarSFill onClick={() => toggleStar(task.id)} />
        ) : (
          <RiStarSLine onClick={() => toggleStar(task.id)} />
        )}
        <RiCloseFill onClick={() => removeTask(task.id)} />
      </OptionContainer>
    </TaskContainer>
  );
};

export default Task;
