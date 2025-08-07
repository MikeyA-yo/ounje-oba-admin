import Link from "next/link";
import { Button } from "../ui/button";

interface SummaryData {
  text: string;
  subtext: string;
  price: string;
}

export const SummaryTable = ({
  title,
  href,
  data,
}: {
  title: string;
  href: string;
  data: SummaryData[];
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto border rounded-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-y-4 border-b">
        <h2 className="h6-medium">{title}</h2>

        <Button variant={"ghost"} asChild>
          <Link href={href}>See all</Link>
        </Button>
      </div>

      <div className="space-y-6 mt-6 px-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="space-y-2">
              <p className="body-3-medium">{item.text}</p>
              <p className="caption text-grey-900">{item.subtext}</p>
            </div>
            <p className="font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
