import React from 'react'
import Home from '../Home'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import Breadcrumb from '../common/Breadcrumb'
import Footer from '../common/Footer'
// import { DashboardItems } from '../Pages/Dashboard'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-[16.5%_auto]">
        <div>
          <Sidebar />
        </div>
        <div>
          <Header />
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </section>
  )
}
