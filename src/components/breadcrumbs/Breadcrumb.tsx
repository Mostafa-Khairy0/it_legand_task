"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";

export const NavBaseBreadcrumb = () => {
  const pathname = usePathname();
  const [items, setItems] = useState<
    Array<{
      label: string;
      href?: string;
    }>
  >([]);

  useEffect(() => {
    setItems(() => {
      const items: Array<{
        label: string;
        href?: string;
      }> = [];
      let curr = "";
      pathname
        .split("/")
        .filter((route) => route.length)
        .map((route: string, index: number, routes) => {
          curr += `/${route}`;
          if (!Number.isNaN(+route))
            items.push({ href: curr, label: routes[index - 1] });
        });
      return items;
    });
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex justify-center gap-0 sm:gap-0 items-center">
        {items.map(({ label, href }, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <BreadcrumbSeparator
                className="list-none h-[100%] flex items-center"
                size={15}
              />
            )}
            <BreadcrumbItem>
              {index + 1 == items.length ? (
                <BreadcrumbPage className="text-[15px] sm:text-[18px] capitalize">
                  {label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={href}
                  className="text-[12px] sm:text-[16px] capitalize"
                >
                  {label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
