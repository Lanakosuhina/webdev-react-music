'use client'

import playlist01 from "../../../public/img/playlist01.png"
import playlist02 from "../../../public/img/playlist02.png"
import playlist03 from "../../../public/img/playlist03.png"
import styles from "../Sidebar/Sidebar.module.css"
import React, { Suspense } from "react"
import SVG from "../SVG/SVG"
import SidebarSkeleton from "../SidebarSkeleton/SidebarSkeleton"

export default function Sidebar() {
  const SidebarItem = React.lazy(() => import('../SidebarItem/SidebarItem'))

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <SVG className={styles.logout} icon="logout" />
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <Suspense fallback={<SidebarSkeleton />}>
          <div className={styles.sidebarList}>
            <SidebarItem src={playlist01} alt="day's playlist" />
            <SidebarItem src={playlist02} alt="100 dance hits" />
            <SidebarItem src={playlist03} alt="indi music playlist" />
          </div>
        </Suspense>
      </div>
    </div>
  )
}