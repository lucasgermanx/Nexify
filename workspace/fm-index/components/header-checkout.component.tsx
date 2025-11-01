import Image from "next/image";
import Link from "next/link";

export const HeaderCheckout = () => {
  return (
    <>
      <div className="h-16 bg-slate-900">
        <div className="pt-3">
          <center>
            <Link href="/">
              <Image src="/icon_orange.png" alt="logo" height="70" width="70" />
            </Link>
          </center>
        </div>
      </div>
    </>
  );
};
