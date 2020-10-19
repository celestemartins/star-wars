import { ResidentDetail, ResidentList, PlanetList } from "../views/pages";

const routes = [
  {
    path: "/",
    component: PlanetList,
    exact: true,
  },
  {
    path: "/planets/:id",
    component: ResidentList,
    exact: true,
  },
  {
    path: "/residents/:id",
    component: ResidentDetail,
    exact: true,
  },
];

export default routes;
