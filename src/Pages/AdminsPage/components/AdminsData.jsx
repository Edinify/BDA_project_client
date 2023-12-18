import { useSelector } from "react-redux";
import AdminCard from "./AdminCard";
import Loading from "../../../globalComponents/Loading/Loading";

const AdminsData = () => {
  const { admins, loading } = useSelector((state) => state.adminsPagination);
  const tableHead = [
    { id: 1, label: "Müəllim adı" },
    { id: 3, label: "Email" },
    { id: 7, label: "" },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table admin-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {admins?.map((teacher, i) => (
                <AdminCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  cellNumber={i + 1}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {admins?.map((teacher, i) => (
              <AdminCard
                key={i}
                data={teacher}
                mode="tablet"
                cellNumber={i + 1}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminsData;
