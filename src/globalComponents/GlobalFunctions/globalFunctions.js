import { useDispatch, useSelector } from "react-redux";
import {
  WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
  MAIN_PAGE_TYPE_ACTION_TYPE,
  TABLE_TYPE_ACTION_TYPE,
  MODAL_LESSON_ACTION_TYPE,
  DROPDOWN_ERROR_TYPE,
} from "../../redux/actions-type";


export function useCustomHook() {
  const dispatch = useDispatch();
  const startWeek = new Date();
  startWeek.setDate(
    startWeek.getDate() -
      (startWeek.getDay() === 0 ? 7 : startWeek.getDay()) +
      1
  );
  startWeek.setHours(0, 0, 0, 0);
  const endWeek = new Date();
  endWeek.setDate(startWeek.getDate() + 6);
  endWeek.setHours(0, 0, 0, 0);
  const weeksArr = ["", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
  const lessonHours = [
    {
      first_time: "08:30",
      second_time: "10:00",
    },
    {
      first_time: "10:00",
      second_time: "11:30",
    },
    {
      first_time: "11:30",
      second_time: "13:00",
    },
    {
      first_time: "13:00",
      second_time: "14:30",
    },
    {
      first_time: "14:30",
      second_time: "16:00",
    },
    {
      first_time: "16:00",
      second_time: "17:30",
    },
    {
      first_time: "17:30",
      second_time: "19:00",
    },
    {
      first_time: "19:30",
      second_time: "20:00",
    },
  ];
  const fineTypeList = [
    { name: "Şifahi xəbərdarlıq", key: "verbalWarning" },
    { name: "Yazılı xəbərdarlıq", key: "writtenWarning" },
    { name: "Töhmət", key: "rebuke" },
    { name: "Şiddətli töhmət", key: "severeRebuke" },
  ];
  const whereComingList = [
    { name: "Tədbir", key: "event" },
    { name: "Instagram", key: "instagram" },
    { name: "Tövsiyə", key: "referral" },
    { name: "Çöl reklamı", key: "externalAds" },
    { name: "Digər", key: "other" },
  ];

  const tuitionFeeHeadList = [
    { key: "groupNumber", title: "Qrup Nömrəsi" },
    { key: "instructor", title: "İnstruktor" },
    { key: "status", title: "Status" },
    { key: "contractType", title: "Müqavilə növü" },
    { key: "price", title: "Məbləğ" },
    { key: "discount", title: "Endirim %" },
    { key: "finalPrice", title: "Yekun Məbləğ" },
    { key: "amountPaid", title: "Ödənilmiş məbləğ" },
    { key: "remainder", title: "Qalıq" },
    { key: "studentName", title: "Tələbənin adı" },
    { key: "fin", title: "Fin kodu" },
    { key: "phone", title: "Nömrəsi" },
    { key: "startDate", title: "Dərs baş. tarixi" },
  ];

  const getWeeksBetweenDates = (start, end) => {
    let weeksList = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let startWeek = new Date(startDate);
    let endWeek = new Date(startDate);

    if (endWeek.getDay() > 0) {
      endWeek.setDate(startDate.getDate() + (7 - startDate.getDay()));
    }

    const lastWeekEndDay = new Date(endDate);

    if (lastWeekEndDay.getDay() > 0) {
      lastWeekEndDay.setDate(
        lastWeekEndDay.getDate() + (7 - lastWeekEndDay.getDay())
      );
    }
    lastWeekEndDay.setDate(lastWeekEndDay.getDate() + 1);

    while (lastWeekEndDay > endWeek) {
      weeksList.push({
        startWeek: startWeek.toString(),
        endWeek: endWeek.toString(),
        allWeekDays: {
          monday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 6)
          ).toString(),
          tuesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 5)
          ).toString(),
          wednesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 4)
          ).toString(),
          thursday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 3)
          ).toString(),
          friday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 2)
          ).toString(),
          saturday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 1)
          ).toString(),
          sunday: endWeek.toString(),
        },
      });

      if (startWeek.getDay() === 0) {
        startWeek.setDate(startWeek.getDate() + 1);
      } else {
        startWeek.setDate(startWeek.getDate() + (8 - startWeek.getDay()));
      }

      endWeek.setDate(endWeek.getDate() + 7);
    }

    weeksList.at(-1).endWeek = endDate.toString();

    dispatch({
      type: WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,
      payload: weeksList,
    });
  };
  const changeMainPageType = (type) => {
    dispatch({
      type: MAIN_PAGE_TYPE_ACTION_TYPE.GET_MAIN_PAGE_TYPE,
      payload: type,
    });
  };
  const changeTableType = (type) => {
    dispatch({ type: TABLE_TYPE_ACTION_TYPE.GET_TABLE_TYPE, payload: type });
  };
  const createLessonModal = (data) => {
    dispatch({
      type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
      payload: data,
    });
  };
  const clearLessonModal = () => {
    dispatch({
      type: MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON,
      payload: { modalLesson: {}, openModal: false },
    });
  };
  const changeDropdownNameErr = (value) => {
    dispatch({ type: DROPDOWN_ERROR_TYPE.GET_DROPDOWN_ERROR, payload: value });
  };

  return {
    startWeek,
    endWeek,
    lessonHours,
    weeksArr,
    fineTypeList,
    tuitionFeeHeadList,
    whereComingList,
    getWeeksBetweenDates,
    changeMainPageType,
    changeTableType,
    createLessonModal,
    clearLessonModal,
    changeDropdownNameErr,
  };
}
