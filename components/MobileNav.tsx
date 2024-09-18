'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { sidebarLinks } from '@/constant';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          {/* <Image
            src="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/Home.svg"
            width={10}
            height={10}
            alt="hamburger icon"
            className='cursor-pointer text-4xl font-extrabold lg:text-7xl hover:text-gray-900 text-black'
          /> */}
          <span className='cursor-pointer text-4xl font-extrabold lg:text-7xl hover:text-gray-900 text-black'>Toggle</span>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            {/* <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="yoom logo"
            /> */}
            <p className="text-[26px] font-extrabold text-white hover:underline">SpeedX</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                          {
                            'bg-blue-1': isActive,
                          }
                        )}
                      >
                    
                        <p className="font-semibold hover:underline">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;