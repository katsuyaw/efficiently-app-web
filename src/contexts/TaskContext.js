import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { auth, firestore } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

export const TaskContext = React.createContext(null);

export const TaskContextProvider = ({ children }) => {
  const { updateTheme } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [inboxCount, setInboxCount] = useState();
  const [todayCount, setTodayCount] = useState();
  const [starCount, setStarCount] = useState();
  const [upcomingCount, setUpcomingCount] = useState();
  const [archiveCount, setArchiveCount] = useState();

  const { userDB } = useAuth();
  const taskDB = auth.currentUser
    ? firestore.collection(`users/${auth.currentUser.uid}/userTasks`)
    : firestore.collection(`catch`);

  var todayDate = moment().format("YYYY-MM-D");

  // intial loading of locally saved tasks
  const getTasks = () => {
    taskDB.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTasks(items);
    });
  };

  useEffect(() => {
    getTasks();
  }, []); // eslint-disable-line

  const searchBarRef = useRef(null);
  const inboxRef = useRef(null);
  const starRef = useRef(null);
  const archiveRef = useRef(null);
  const upcomingRef = useRef(null);
  const todayRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const editRef = useRef(null);

  // search related
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search set");
  };

  const completeTask = (task) => {
    taskDB
      .doc(task.id)
      .update({ completed: !task.completed })
      .then(() => {
        console.log("Document successfully deleted!");
        console.log("taskDB.id", taskDB.id);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const removeTask = (id) => {
    taskDB
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const editTask = (task, edit) => {
    taskDB
      .doc(task.id)
      .update({ title: edit })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const editSchedule = (task, schedule) => {
    console.log("editSchedule");
    taskDB
      .doc(task.id)
      .update({ scheduleDate: schedule })
      .then(() => {
        console.log("Document successfully edited!");
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
      });
  };

  const toggleStar = (task) => {
    taskDB
      .doc(task.id)
      .update({ star: !task.star })
      .then(() => {
        console.log("Document successfully toggeled star");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  // handler for submitting input
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskId = uuidv4(); // generate string id every time task is generated and assign to it
    taskDB.doc(taskId).set({
      id: taskId, // task gets assigned the id
      title: input,
      completed: false,
      star: false,
      createdDate: todayDate,
      dueDate: "",
      scheduleDate: "",
    });
    console.log("taskDB is:", taskDB.id);
    // clear input
    setInput("");
  };
  // not functioning
  const removeUserTasks = () => {
    taskDB
      .doc("*")
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  // hook to handle TaskInput value
  const initialNavState = window.innerWidth <= 760 ? false : true;
  const initialTheme = userDB
    .doc("theme")
    .get()
    .then((doc) => {
      if (doc.exists) {
        setTheme(doc.data().theme);
      } else {
        console.log("err");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  console.log("Initial theme is: ", initialTheme);

  const [theme, setTheme] = useState(initialTheme);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(initialNavState);

  const handleTheme = (color) => {
    setTheme(color);
    updateTheme(color);
    // should post to firebase here?
  };

  return (
    <TaskContext.Provider
      value={{
        dark,
        setDark,
        editSchedule,
        inboxCount,
        setInboxCount,
        todayCount,
        setTodayCount,
        starCount,
        setStarCount,
        upcomingCount,
        setUpcomingCount,
        archiveCount,
        setArchiveCount,
        theme,
        handleTheme,
        tasks,
        setTasks,
        searchBarRef,
        inboxRef,
        starRef,
        archiveRef,
        upcomingRef,
        todayRef,
        searchRef,
        inputRef,
        editRef,
        search,
        setSearch,
        handleSearch,
        todayDate,
        completeTask,
        removeTask,
        editTask,
        toggleStar,
        handleSubmit,
        input,
        setInput,
        navOpen,
        setNavOpen,
        removeUserTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
