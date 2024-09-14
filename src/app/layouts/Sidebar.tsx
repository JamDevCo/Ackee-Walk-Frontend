'use client'

import React from 'react'
import Link from 'next/link'
import { Home, BarChart2, Users, PlusCircle, Calculator, Briefcase, LucideIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/salaries", label: "Salaries", icon: BarChart2 },
  { href: "/companies", label: "Companies", icon: Users },
  { href: "/submission", label: "Submit Salary", icon: PlusCircle },
  {
    href: "#",
    label: "Calculators",
    icon: Calculator,
    subItems: [
      { href: "/calculator/basic", label: "Basic Calculator", icon: Calculator },
      { href: "/calculator/advanced", label: "Advanced Calculator", icon: Calculator },
    ],
  },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
]

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4 mb-6">
        <span className="text-2xl font-extrabold">Ackee Walk</span>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex-col items-start space-y-2">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index} className="w-full">
              {item.subItems ? (
                <>
                  <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} w-full text-left`}>
                    <item.icon className="mr-2" size={20} />
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-md rounded-md">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavigationMenuItem key={subIndex}>
                        <Link href={subItem.href} legacyBehavior passHref>
                          <NavigationMenuLink className="block py-2 px-4 hover:bg-gray-100 rounded w-full text-left">
                            {subItem.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full text-left`}>
                    <item.icon className="mr-2" size={20} />
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Sidebar