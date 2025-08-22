import { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s | Riverland Mall",
    default: "Location",
  },
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="">
      <div className="">{children}</div>
    </main>
  );
}
