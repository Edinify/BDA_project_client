import { useDispatch, useSelector } from "react-redux";
import {
  WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE,
  MAIN_PAGE_TYPE_ACTION_TYPE,
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
  const weeksArrFullName = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə", ];

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
  const lessonStatusList = [
    { name: "Baxılmayıb", key: "unviewed" },
    { name: "Təsdiqləndi", key: "confirmed" },
    { name: "Ləğv edildi", key: "cancelled" },
  ];
  const fineTypeList = [
    { name: "Şifahi xəbərdarlıq", key: "verbalWarning" },
    { name: "Yazılı xəbərdarlıq", key: "writtenWarning" },
    { name: "Töhmət", key: "rebuke" },
    { name: "Şiddətli töhmət", key: "severeRebuke" },
  ];
  const whereComingList = [
    { name: "İnstagram Sponsorlu", key: "instagramSponsor" },
    { name: "İnstagram standart", key: "instagramStandart" },
    { name: "İnstruktor Tövsiyyəsi", key: "instructorRecommend" },
    { name: "Dost Tövsiyyəsi", key: "friendRecommend" },
    { name: "Sayt", key: "site" },
    { name: "Tədbir", key: "event" },
    { name: "AİESEC", key: "AİESEC" },
    { name: "PO COMMUNİTY", key: "POCOMMUNİTY" },
    { name: "Köhnə tələbə", key: "oldStudent" },
    { name: "Staff tövsiyyəsi", key: "staffRecommend" },
    { name: "SMS REKLAMI", key: "smsAd" },
    { name: "PROMOKOD", key: "promocode" },
    { name: "Resale", key: "resale" },
  ];
  const personaList = [
    { name: "Həvəsli", key: "enthusiastic" },
    { name: "Narazı", key: "dissatisfied" },
    { name: "Müahidəçi", key: "contractor" },
    { name: "Demaqoq", key: "demagog" },
    { name: "Ekstravert", key: "extrovert" },
    { name: "İntravert", key: "introvert" },
    { name: "Ailəcanlı", key: "familyFriendly" },
  ];
  const discountReasonList = [
    { name: "Teknest", key: "technest" },
    { name: "Digər", key: "other" },
  ];
  const constStatusList = [
    { name: "Təyin edildi", key: "appointed" },
    { name: "Satıldı", key: "sold" },
    { name: "Ləğv edildi", key: "cancelled" },
    { name: "Düşünür", key: "thinks" },
  ];
  const cancelReasonList = [
    { name: "Maddi", key: "financial" },
    { name: "Vaxt Uyğunsuzluğu", key: "timeMismatch" },
    { name: "Təlimçi seçimi", key: "teacherSelection" },
    { name: "Qərarsızlıq", key: "indecision" },
  ];
  const knowledgeList = [
    { name: "Ekspert", key: "master" },
    { name: "Yaxşı", key: "good" },
    { name: "Orta", key: "normal" },
    { name: "Zəif", key: "weak" },
    { name: "Sıfır", key: "zero" },
  ];
  const paymentTypeList = [
    // { name: "Tam ödəniş", key: 1 },
    // { name: "Dərs müddətində", key: "duringLesson" },
    // { name: "11 hissəli", key: "2part" },

    { name: "1 hissəli", key: 1 },
    { name: "2 hissəli", key: 2 },
    { name: "3 hissəli", key: 3 },
    { name: "4 hissəli", key: 4 },
    { name: "5 hissəli", key: 5 },
    { name: "6 hissəli", key: 6 },
    { name: "7 hissəli", key: 7 },
    { name: "8 hissəli", key: 8 },
    { name: "9 hissəli", key: 9 },
    { name: "10 hissəli", key: 10 },
    { name: "11 hissəli", key: 11 },

    // { name: "Seçim yoxdur", key: "noChoice" },
    // { name: "Kredit Kart Birbaşa", key: "creditCardDirect" },
    // { name: "Kredit Kart 10 ay", key: "creditCard10Months" },
    // { name: "Kredit kart hissəli", key: "creditCardInstallment" },
    // { name: "Teknest 70%", key: "technest70" },
    // { name: "Teknest 90%", key: "technest90" },
    // { name: "Teknest 100%", key: "technest100" },
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
  const generalProfileList = [
    { name: "Qruplar", key: "groups" },
    { name: "Əməkdaşlar", key: "workers" },
    { name: "Tələbələr", key: "students" },
    { name: "Təlimçilər", key: "teachers" },
    { name: "Fənlər", key: "courses" },
    { name: "Təhsil haqqı", key: "tuitionFee" },
    { name: "Karyera", key: "career" },
    { name: "Konsultasiya", key: "consultation" },
  ];
  const generalProfilePowerList = [
    { name: "Tam", key: "all" },
    { name: "Yalnız görmək", key: "only-show" },
    { name: "Dəyişiklik", key: "update" },
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
    weeksArrFullName,
    fineTypeList,
    tuitionFeeHeadList,
    whereComingList,
    generalProfileList,
    generalProfilePowerList,
    paymentTypeList,
    discountReasonList,
    personaList,
    knowledgeList,
    cancelReasonList,
    constStatusList,
    lessonStatusList,
    getWeeksBetweenDates,
    changeMainPageType,
    createLessonModal,
    clearLessonModal,
    changeDropdownNameErr,
  };
}
