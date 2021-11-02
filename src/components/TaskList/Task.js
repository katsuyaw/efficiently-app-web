import React, { useContext, useEffect, useRef, useState } from "react";
import { RiCloseFill, RiStarSFill, RiStarSLine } from "react-icons/ri";
import moment from "moment";
import { TaskContext } from "../../contexts/TaskContext";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const TaskContainer = styled.div`
  width: 60%;
  padding: 1rem 0.3rem 0;
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Checkbox = styled.input`
  margin: 0 1rem;
  height: 1rem;
  width: 1rem;
  background-color: #eee;
`;

const TaskNameContainer = styled.div`
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OptionContainer = styled.button`
  position: absolute;
  right: 1rem;
  display: flex;
`;

const EditInput = styled.input`
  background-color: #efefef;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const DaysContainer = styled.div`
  position: absolute;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.6em;
`;

const Task = ({ task }) => {
  const { completeTask, removeTask, toggleStar, editTask, editSchedule } =
    useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(task.title);
  const [isEditSchedule, setIsEditSchedule] = useState(false);
  const [schedule, setSchedule] = useState(task.scheduleDate);

  const handleChange = (e) => {
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
  }, [isEdit]); // eslint-disable-line

  const editKeyDown = (e) => {
    // stops edit when enter is hit in edit input.
    if (e.key === "Enter") {
      if (edit === "" || /^\s*$/.test(edit)) {
        // check input
        console.log("Invalid edit");
        return;
      }
      // if same don't run saveTasks()
      if (edit === task.title) {
        setIsEdit(false);
        return;
      }
      setEdit(edit); //change value of edit,
      setIsEdit(false); // set edit attribute to false,
      editTask(task, edit); // update the task globally.
    }
  };
  const editScheduleKeyDown = (e) => {
    // stops edit when enter is hit in edit input.
    if (e.key === "Enter") {
      if (edit === "" || /^\s*$/.test(edit)) {
        // check input
        console.log("Invalid edit");
        return;
      }
      // if same don't run saveTasks()
      if (edit === task.title) {
        setIsEditSchedule(false);
        return;
      }
      setSchedule(schedule); //change value of edit,
      setIsEditSchedule(false); // set edit attribute to false,
      editSchedule(task, schedule); // update the task globally.
    }
  };

  const outsideClick = () => {
    console.log("outside click");
    if (edit === "") {
      // check if edit is empty
      removeTask(task.id);
      setIsEdit(false);
      return;
    }
    if (edit === task.title) {
      // check if edit is the same
      setIsEdit(false);
      return;
    }
    setEdit(edit); //change value of edit,
    setSchedule(schedule);
    setIsEdit(false); // set edit attribute to false,
    setIsEditSchedule(false);
    editTask(task, edit); // update the task.
    editSchedule(task, schedule);
  };

  let untilScheduleDate = moment(task.scheduleDate).fromNow();
  let untilDueDate = moment(task.dueDate).fromNow();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleOnDayChange = (date) => {
    console.log(formatDate(date));
    editSchedule(task, formatDate(date.toLocaleDateString()));
  };

  const FORMAT = "MM/dd/yyyy";
  return (
    <TaskContainer key={task.id}>
      <Checkbox
        defaultChecked={task.completed}
        type="Checkbox"
        onClick={() => completeTask(task)}
      />
      <TaskNameContainer onClick={handleOnClickEdit}>
        {isEdit ? (
          <EditInput
            placeholder="Press enter to confirm edit"
            value={edit}
            onChange={handleChange}
            onBlur={outsideClick}
            onKeyDown={editKeyDown}
            ref={editRef}
          />
        ) : (
          <div
            style={
              task.completed
                ? { textDecorationLine: "line-through" }
                : { textDecorationLine: "none" }
            }
          >
            {edit}
          </div>
        )}
      </TaskNameContainer>
      <DaysContainer>
        <DayPickerInput
          value={schedule}
          placeholder={task.scheduleDate || "Not scheduled"}
          onDayChange={(date) => handleOnDayChange(date)}
          format={FORMAT}
        />
        <p>{task.scheduleDate && <span>({untilScheduleDate})</span>}</p>
      </DaysContainer>

      <OptionContainer>
        {task.star ? (
          <RiStarSFill onClick={() => toggleStar(task)} />
        ) : (
          <RiStarSLine onClick={() => toggleStar(task)} />
        )}
        <RiCloseFill onClick={() => removeTask(task.id)} />
      </OptionContainer>
    </TaskContainer>
  );
};

export default Task;
