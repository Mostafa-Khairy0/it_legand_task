"use client";
import { NavBaseBreadcrumb } from "../breadcrumbs";
import { ModeToggle } from "../buttons";

export const RootNav = () => {
  return (
    <div className="flex flex-row justify-between">
      <NavBaseBreadcrumb />
      <ModeToggle />
    </div>
  );
};
