import { useEffect } from "react";
import DateFilter from "./components/DateFilter/DateFilter";
import FinanceData from "./components/FinanceData/FinanceData";
import { useFinanceCustomHook } from "./utils";
import { useSelector } from "react-redux";
import DataHead from "./components/DataHead/DataHead";

const GroupsPage = () => {
  const { expensesActivateGet } = useSelector((state) => state.expensesModal);
  const { incomesActivateGet } = useSelector((state) => state.incomesModal);
  const {
    getAllDefaultData,
    getFinanceDataAfterUpdate,
    getFinanceDataAfterCreate,
  } = useFinanceCustomHook();

  useEffect(() => {
    if (expensesActivateGet === "update") {
      getFinanceDataAfterUpdate();
    } else if (expensesActivateGet === "create") {
      getFinanceDataAfterCreate("expenses");
    } else if (expensesActivateGet === "delete") {
      getFinanceDataAfterUpdate();
    }
  }, [expensesActivateGet]);

  useEffect(() => {
    if (incomesActivateGet === "update") {
      getFinanceDataAfterUpdate();
    } else if (incomesActivateGet === "create") {
      getFinanceDataAfterCreate("incomes");
    } else if (incomesActivateGet === "delete") {
      getFinanceDataAfterUpdate();
    }
  }, [incomesActivateGet]);

  useEffect(() => {
    getAllDefaultData();
  }, []);

  return (
    <div className="finance-page details-page">
      <div className="finance-top">
        <DateFilter />
      </div>

      <div className="finance-bottom">
        <DataHead />
        <FinanceData />
      </div>
    </div>
  );
};

export default GroupsPage;
