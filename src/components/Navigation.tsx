'use client'
import { usePathname } from "next/navigation"
import Link from 'next/link'

type Props = {
  navLinks: { href: string, icon: JSX.Element }[]
}

function Navigation({ navLinks }: Props) {
  const pathname = usePathname();

  return (
    <div className="btm-nav shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      {navLinks.map((obj, i) => {
        const isActive = pathname === obj.href;
        return <Link href={obj.href} key={i} className={isActive ? 'active' : undefined}>{obj.icon}</Link>
      })}
    </div>
  )
}

export default Navigation