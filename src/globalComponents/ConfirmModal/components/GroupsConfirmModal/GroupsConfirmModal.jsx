import moment from "moment";

const GroupsConfirmModal = ({ groupModalData }) => {
  console.log(groupModalData);

  let teachers =
    Array.isArray(groupModalData?.teachers) &&
    groupModalData?.teachers.length > 0
      ? groupModalData?.teachers
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";

  let students =
    Array.isArray(groupModalData?.students) &&
    groupModalData?.students.length > 0
      ? groupModalData?.students
          .map((item) => {
            return `${item.fullName}`;
          })
          .join(", ")
      : "boş";
  let lessonDates = groupModalData.lessonDate.map((item, index) => (
    <span className="lesson-date" key={index}>
      gün: {item.day}, saat: {item.time} <br />
    </span>
  ));
  const dataList1 = [
    { title: "Qrup adı", value: groupModalData?.name },
    { title: "İxtisas", value: groupModalData.course.name },
    { title: "Təlimçilər", value: teachers },
    { title: "Tələbələr", value: students },
    { title: "Dərs günləri", value: lessonDates },
    {
      title: "Başlama tarixi",
      value: moment(groupModalData.startDate)
        .locale("az")
        .format("DD MMMM YYYY"),
    },
    {
      title: "Bitmə tarixi",
      value: moment(groupModalData.endDate).locale("az").format("DD MMMM YYYY"),
    },
  ];
  return (
    <>
      <div className="more-modal-header-inform">
        {dataList1.map((item, index) => (
          <h3 key={index}>
            {item?.title}: <span>{item?.value}</span>
          </h3>
        ))}
      </div>
    </>
  );
};

export default GroupsConfirmModal;
