import { Tab, Tabs } from "@teslo/react-ui/Tabs";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { User, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { useFetcUsers } from "./hooks/useFetchUsers";
import TableUsers from "./TableUsers.tsx";
import { validPaths } from "@/utils";
import { FaUsers } from "react-icons/fa";
import { translate } from "@/i18n";

interface IUsersPageProps {}

const UsersPage: React.FunctionComponent<IUsersPageProps> = (props) => {
  const {} = props;
  const { data: users, setData, isFetching, refetch } = useFetcUsers();

  const [selectedValue, setSelected] = React.useState(ValidRoles.ADMIN);
  const usersSelected = users.filter((user) => user.roles.includes(selectedValue));

  return (
    <HeaderDashboard
      to={validPaths.dashboard.path}
      title={translate("users.title")}
      icon={<FaUsers />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("users.title") },
      ]}
    >
      <div className="tile">
        <div className="mb-4">
          <Tabs setSelectedValue={setSelected} selectedValue={selectedValue}>
            <Tab value={ValidRoles.ADMIN}>{translate("users.admins")}</Tab>
            <Tab value={ValidRoles.USER}>{translate("users.customers")}</Tab>
          </Tabs>
        </div>
        <TableUsers
          users={usersSelected}
          setUsers={(data: User[]) =>
            setData([...data, ...users.filter((user) => !user.roles.includes(selectedValue))])
          }
          isFetching={isFetching}
          refetch={refetch}
          validRol={selectedValue}
        />
      </div>
    </HeaderDashboard>
  );
};

export default React.memo(UsersPage);
