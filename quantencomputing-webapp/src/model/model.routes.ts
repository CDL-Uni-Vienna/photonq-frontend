import { lazy } from "react";

const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const MyProjectPage = lazy(() => import("../pages/MyProjectPage"));
const EditorPage = lazy(() => import("../pages/EditorPage"));
const ResultsPage = lazy(() => import("../pages/ResultsPage"));

const LANDING_PAGE_PATH = "https://quantencomputing-landing-page.vercel.app";

export enum Path {
  Login = "/login",
  Register = "/register",
  Profile = "/profile",
  MyProjects = "/my-projects",
  SingleExperiment = "/experiment/:id",
  ExperimentResult = "/experiment/:id/result",
}

export function getPathWithId(id: string, path: Path) {
  if (!path.includes(":id")) throw new Error("Path has no id");
  return path.replace(":id", id);
}

/**
 *
 */
export function getPublicRoutes() {
  return [
    {
      path: Path.Login,
      label: "Login",
      page: LoginPage,
    },
    {
      path: Path.Register,
      label: "Register",
      page: RegisterPage,
    },
  ];
}

/**
 *
 */
export function getPrivateRoutes() {
  return [
    {
      path: Path.Profile,
      label: "Profile",
      page: ProfilePage,
    },
    {
      path: Path.MyProjects,
      label: "My Projects",
      page: MyProjectPage,
    },
    {
      path: Path.SingleExperiment,
      label: "Experiment",
      page: EditorPage,
    },
    {
      path: Path.ExperimentResult,
      label: "Result",
      page: ResultsPage,
    },
  ];
}

/**
 *
 */
export function getPathsWithoutNavbar(): string[] {
  return ["experiment"];
}

/**
 *
 */
export function getNavbarRoutes() {
  return [
    {
      path: Path.Profile,
      label: "Profile",
    },
    {
      path: Path.MyProjects,
      label: "My Projects",
    },
    {
      href: `${LANDING_PAGE_PATH}/en/how-to-guides`,
      label: "How to Guides",
    },
  ];
}
