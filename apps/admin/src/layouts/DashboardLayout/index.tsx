import * as React from "react";
import HeaderDashboard from "./HeaderDashboard";
import SidebarDashboard from "./SidebarDashboard";
import { useAuthStore, useCartStore, useConfigApp } from "@/store";
import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import useResponsive from "@/utils/hooks/useResponsive";
import axios from "axios";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { detailTempOrdersService } from "@teslo/services";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = (props) => {
  const {} = props;
  const { user } = useAuthStore();
  const { setCart } = useCartStore();
  const [loading, setLoading] = React.useState(true);
  const { colors } = useConfigApp();
  const { desktop } = useResponsive();

  React.useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        showLoader();
        setLoading(true);
        const res = await detailTempOrdersService.getAll({ cancelToken: ourRequest.token });
        setCart(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    if (user?.iduser) {
      fetchData();
    }

    return () => {
      ourRequest.cancel();
    };
  }, [user?.iduser]);

  return (
    <div className="app-layout-classic flex flex-auto">
      <div className="flex flex-auto min-w-0">
        <RenderIf isTrue={!colors.isHeaderTop}>
          <SidebarDashboard />
        </RenderIf>
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <HeaderDashboard />
          <RenderIf isTrue={colors.isHeaderTop}>
            <SidebarDashboard />
          </RenderIf>

          <div
            className={classNames(
              "h-full flex flex-auto flex-col bg-gray-100",
              colors.isHeaderTop && desktop && "pt-[4.5rem]"
            )}
          >
            {!loading && props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
