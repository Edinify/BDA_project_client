import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  updateLessonTableAction } from "../../../redux/actions/lessonTableActions";

const MentorHour = ({ data }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);

  const [checkMentorHour, setCheckMentorHour] = useState(
    data.mentorHour || false
  );
  const dispatch = useDispatch();

  const changeMentorHour = () => {
    dispatch(
      updateLessonTableAction(data._id, { mentorHour: data.mentorHour })
    );
    setCheckMentorHour(!checkMentorHour);

  };

  useEffect(() => {
    if (user?.role === "super-admin") {
      setIsDisabled(false);
    }

    if (user?.role === "worker") {
      const power = user?.profiles?.find(
        (item) => item.profile === "lessonTable"
      )?.power;

      if (power === "all" || "update") {
        setIsDisabled(false);
      }
    }

    if (user?.role === "teacher") {
      setIsDisabled(true);
    }

    if (user?.role === "mentor" && data?.topic?.name === "Praktika") {
      setIsDisabled(false);
    }
  }, []);

  useEffect(() => {
    setCheckMentorHour(data.mentorHour);
  }, [data.mentorHour]);
  return (
    <form>
      <input
      disabled={isDisabled}
        value={checkMentorHour}
        style={{ marginRight: "10px" }}
        type="checkbox"
        checked={checkMentorHour}
        onChange={changeMentorHour}
      />
      <span style={{ color: checkMentorHour ? "#07bc0c" : "#e74c3c" }}>
        {checkMentorHour ? "Keçirilib" : "Keçirilməyib"}
      </span>
    </form>
  );
};

export default MentorHour;
