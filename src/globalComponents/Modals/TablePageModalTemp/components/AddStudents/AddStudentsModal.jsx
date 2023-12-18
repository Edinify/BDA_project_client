import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../../../assets/icons/search-normal.svg";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/back-icon.svg";
import { ReactComponent as CloseImg } from "../../../../../assets/icons/closeMenu.svg";
import { getstudentsByCourseIdAction } from "../../../../../redux/actions/studentsActions";

const AddStudentsModal = ({
  setStudentAddModal,
  setCheckedStudents,
  checkedStudents,
  modalLesson,
  functionType,
  selectedCourse,
  weekday,
}) => {
  const dispatch = useDispatch();
  const { studentsByCourse, loading } = useSelector(
    (state) => state.studentsPagination
  );
  const [search, setSearch] = useState("");
  const [studentsIdInLesson, setStudentsIdInLesson] = useState("");
  const checkedStudentIds = checkedStudents.map((item) => {
    return item.student._id;
  });
  const lessonDate = modalLesson?.selectedWeekDay
    ? modalLesson?.selectedWeekDay
    : modalLesson?.startWeek;

  const changeStudentCheck = (e, selectedStudent) => {
    const existStudent =
      modalLesson.getLesson.length > 0 &&
      modalLesson.getLesson[0].students.find(
        (item) => item.student._id === selectedStudent._id
      );
    if (e.target.checked) {
      setCheckedStudents([
        ...checkedStudents,
        existStudent ? existStudent : { student: selectedStudent },
      ]);
    } else {
      const removeUnchecked =
        Array.isArray(checkedStudents) &&
        checkedStudents.filter(
          (checkedStudent) => checkedStudent.student._id !== selectedStudent._id
        );
      setCheckedStudents(removeUnchecked);
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(
      getstudentsByCourseIdAction({
        courseId: selectedCourse._id,
        day: weekday,
        time: `${modalLesson?.time.first_time}-${modalLesson?.time.second_time}`,
        role: "current",
        date: lessonDate,
        studentsCount: 0,
        searchQuery: search ? search : "",
      })
    );
  };
  const getMoreData = () => {
    dispatch(
      getstudentsByCourseIdAction({
        courseId: selectedCourse._id,
        day: weekday,
        time: `${modalLesson?.time.first_time}-${modalLesson?.time.second_time}`,
        role: "current",
        date: lessonDate,
        studentsCount: studentsByCourse?.length ? studentsByCourse?.length : 0,
        searchQuery: search ? search : "",
      })
    );
  };
  const closeModal = () => {
    setStudentAddModal(false);
  };

  useEffect(() => {
    if (functionType === "update") {
      setStudentsIdInLesson(() => {
        return modalLesson.getLesson[0].students.map((student) => {
          return student.student._id;
        });
      });
    }
  }, []);

  return (
    <div className="add-students">
      <div className="add-student-data">
        <div className="add-student-container">
          <div className="add-student-close-icon">
            <CloseImg onClick={() => closeModal()} />
          </div>

          <h4>Əlavə et</h4>

          <div className="mobile-student-add-header">
            <BackIcon onClick={() => closeModal()} />
            <h4>Əlavə et</h4>
          </div>

          <form onSubmit={(e) => searchData(e)} className="student-filter">
            <div onClick={(e) => searchData(e)}>
              <SearchIcon />
            </div>

            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Axtar"
            />
          </form>

          <div className="select-students">
            {functionType === "create" &&
              studentsByCourse?.map((student, i) => (
                <div
                  className={`select-student ${
                    student.disable || student.lessonAmount < 1
                      ? "disabled"
                      : ""
                  }`}
                  key={i}
                >
                  <input
                    type="checkbox"
                    name={student.fullName}
                    value={student}
                    disabled={student.disable}
                    checked={
                      checkedStudentIds.indexOf(student._id) > -1 ? true : false
                    }
                    onChange={(e) => changeStudentCheck(e, student)}
                  />
                  <label htmlFor={student.fullName}>{student.fullName}</label>
                </div>
              ))}

            {functionType === "update" &&
              studentsByCourse?.map((student, i) => (
                <div
                  className={`select-student ${
                    studentsIdInLesson.indexOf(student._id) < 0 &&
                    (student.disable ? "disabled" : "")
                  }`}
                  key={i}
                >
                  <input
                    type="checkbox"
                    name={student.fullName}
                    value={student}
                    disabled={
                      studentsIdInLesson.indexOf(student._id) < 0
                        ? student.disable
                        : false
                    }
                    checked={
                      checkedStudentIds.indexOf(student._id) > -1 ? true : false
                    }
                    onChange={(e) => changeStudentCheck(e, student)}
                  />
                  <label htmlFor={student.fullName}>{student.fullName}</label>
                </div>
              ))}
            <button
              onClick={() => getMoreData()}
              className="more-btn"
              disabled={loading}
            >
              {loading ? "yüklənir..." : "daha cox"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentsModal;
