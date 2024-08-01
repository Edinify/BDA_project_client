import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { updateLessonTableAction } from "../../../redux/actions/lessonTableActions";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";

const LessonStatus = ({ data }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { lessonTableModalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const [isTargetCard, setIsTargetCard] = useState(false);

  console.log(lessonTableModalLoading, "lesson loading");

  const confirmedStatusList = [
    { status: "unviewed", label: "Gözləmədə" },
    { status: "confirmed", label: "Keçirilib" },
    { status: "cancelled", label: "Ləğv edilib" },
  ];

  const updateStatus = (item) => {
    if (!isDisabled) {
      dispatch(updateLessonTableAction(data._id, { status: item.status }));
      setIsTargetCard(true);
    }
  };

  useEffect(() => {
    if (user?.role === "super-admin") {
      setIsDisabled(false);
    }

    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "lessonTable"
      )?.power;

      if (power === "all" || power === "update") {
        setIsDisabled(false);
      }
    }

    if (user?.role === "teacher" && data?.topic?.name !== "Praktika") {
      setIsDisabled(false);
    }

    if (user?.role === "mentor" && data?.topic?.name === "Praktika") {
      setIsDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (!lessonTableModalLoading) setIsTargetCard(false);
  }, [lessonTableModalLoading]);

  return (
    <form className="lesson-page-status">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(lessonTableModalLoading && isTargetCard && <LoadingBtn />) ||
          confirmedStatusList?.map((item, i) => (
            <FormControlLabel
              disabled={isDisabled}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginRight: 0,
              }}
              key={i}
              value={item.status}
              control={<Radio checked={data.status === item.status} />}
              label={item.label}
              onClick={() => updateStatus(item)}
            />
          ))}
      </RadioGroup>
    </form>
  );
};

export default LessonStatus;
