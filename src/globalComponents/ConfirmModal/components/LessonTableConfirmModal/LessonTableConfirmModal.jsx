import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
const LessonTableConfirmModal = ({ lessonTableModalData }) => {
  const { weeksArrFullName, lessonStatusList } = useCustomHook();

  const lessonDay = lessonTableModalData.date
    ? `${moment(lessonTableModalData.date)
        .locale("az")
        .format("DD MMMM YYYY")}, ${
        weeksArrFullName[moment(new Date(lessonTableModalData.date)).day()]
      },`
    : "";

  const students =
    lessonTableModalData.students?.map((student) => student.student.fullName) ||
    [];

  const dataList1 = [
    { title: "Qrup", value: lessonTableModalData?.group?.name },
    { title: "Ixtisas", value: lessonTableModalData?.group?.course?.name },
    {
      title: "Mövzu",
      value: `${lessonTableModalData?.topic?.orderNumber}. ${lessonTableModalData?.topic?.name}`,
    },
    { title: "Müəllim", value: lessonTableModalData?.teacher.fullName },
    { title: "Dərs günü", value: lessonDay },
    { title: "Dərs saatı", value: lessonTableModalData?.time },
    { title: "Status", value: lessonTableModalData?.status },
    { title: "Tələbələr", value: students?.join(",") },
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

export default LessonTableConfirmModal;
