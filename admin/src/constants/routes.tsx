import Home from "@/pages/Home/home";
import TablePolaris from '@/pages/Table/table';
import PolarisDemo from "@/pages/Home/polaris";
import Create from "@/pages/Table/create";
import Custom from "@/pages/Custom/custom";
import CreateF from "@/pages/Custom/create";
import ReOpener from "@/pages/ReOpener/re.opener";

interface IRoute<T> {
  path: string;
  element: any;
}

export const publicRoutes: IRoute<any & {}>[] = [
  { path: '/home', element: Home },
  { path: '/demo', element: PolarisDemo },
  { path: '/table', element: TablePolaris },
  { path: '/create', element: Create},
  { path: '/', element: Custom},
  { path: '/createF', element: CreateF},
  { path: '/re-opener', element: ReOpener},

];
