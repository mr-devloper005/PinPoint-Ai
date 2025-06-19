import React from 'react'
import { LiaAtomSolid } from "react-icons/lia";
import { TbSettingsCog } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RiSparkling2Line } from "react-icons/ri";  // sparkel icon
import { SlChemistry } from "react-icons/sl";
import { GiMagnet } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";    //logout icon




function ToggleSidebar({toggle}) {

  
  return (
    <button onClick={toggle} className='h-20 w-20 px-6  z-50  rounded-2xl cursor-pointer'>  
      <TbLayoutSidebarLeftExpand className="text-white hover:bg-gray-400  rounded-4xl p-3 text-6xl " />

    </button>
  )
}

export default ToggleSidebar