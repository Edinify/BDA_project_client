import "moment/locale/az";

const TeacherCells = ({ time, groups, index }) => {
  return (
    <td
      className={`lesson-name teacher-cell`}
      key={time.time + index}
      style={{ padding: "10px", boxSizing: "border-box" }}
    >
      <div className="lesson-box-con">
        <ul>
          {groups.map((data, i) => {
            const { name, lessonDate } = data;

            const date = lessonDate.find(
              (lesson) => lesson.day == index && lesson.time === time.time
            );

            return <li key={i}> {date && name} </li>;
          })}
        </ul>
      </div>
    </td>
  );
};

export default TeacherCells;
