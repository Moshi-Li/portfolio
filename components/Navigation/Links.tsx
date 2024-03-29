"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAnimatedRouter from "../../hooks/useAnimatedRouter";
import { clsx } from "clsx";

export default function Links() {
  const pathname = usePathname();
  const { animatedRoute } = useAnimatedRouter();

  return (
    <ul className="hidden flex-row items-center gap-x-4 md:flex">
      <li>
        <Link
          href={"/"}
          className={clsx({
            "nav--link": true,
            selected: pathname === "/",
          })}
          onClick={(e) => {
            e.preventDefault();
            animatedRoute("/");
          }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/resume"}
          className={clsx({
            "nav--link": true,
            selected: pathname === "/resume",
          })}
          onClick={(e) => {
            e.preventDefault();
            animatedRoute("/resume");
          }}
        >
          Resume
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className={clsx({
            "nav--link": true,
            selected: pathname === "/about",
          })}
          onClick={(e) => {
            e.preventDefault();
            animatedRoute("/about");
          }}
        >
          About
        </Link>
      </li>
      <li>
        <span
          className="nav--link cursor-pointer"
          onClick={() => {
            const container = document.getElementsByClassName("main--content");
            if (container[0]) {
              container[0].scrollTo({
                top: container[0].scrollHeight,
                left: 0,
                behavior: "smooth",
              });
            }
          }}
        >
          Contact
        </span>
      </li>
    </ul>
  );
}
