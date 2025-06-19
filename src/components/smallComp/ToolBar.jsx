// // import React from 'react'

// // function ToolBar() {
// //   return (
// //     <div className='w-full h-1/4  bg-neutral-900'></div>
// //   )
// // }

// // export default ToolBar

// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { ChevronsUpDown, Check } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useDispatch, useSelector } from "react-redux";

// const languages = [
//   { label: "English", value: "en" },
//   { label: "Hindi", value: "hi" },
//   { label: "Spanish", value: "es" },
//   { label: "French", value: "fr" },
// ];

// function Combobox({ selectedValue, onChange }) {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch()
//   const chatId = useSelector(state => state.chat.chatId)

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           className={cn(
//             "w-[200px] justify-between",
//             !selectedValue && "text-muted-foreground"
//           )}
//         >
//           {selectedValue
//             ? languages.find((lang) => lang.value === selectedValue)?.label
//             : "Select Language"}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandList>
//             <CommandGroup>
//               {languages.map((language) => (
//                 <CommandItem
//                   key={language.value}
//                   value={language.value}
//                   onSelect={() => {
//                     onChange(language.value);
//                     setOpen(false);
//                   }}
//                 >
//                   {language.label}
//                   <Check
//                     className={cn(
//                       "ml-auto h-4 w-4",
//                       selectedValue === language.value
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

// function ToolBar() {
//   const [value3, setValue3] = useState("");
  

//   return (
//     <div className="w-full h-auto bg-neutral-900 text-black p-6 space-y-6">
//       <h2 className="text-xl font-bold text-white">ToolBar Settings</h2>

//       <div className="flex flex-col gap-6">

//         <div>
//           <p className="mb-2 text-white">Select Language</p>
//           <Combobox onChange={(newValue) => {
//     if (chatId) {
//       dispatch(updateLanguageThunk({ chatId, language: newValue }));
//     }
//   }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ToolBar;


"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { useDispatch, useSelector } from "react-redux";
import { updateLanguageThunk } from "@/slices/chat/chatSlice";
import toast from "react-hot-toast";

const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Hinglish", value: "hng" },

];

function Combobox({ selectedValue, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[200px] justify-between",
            !selectedValue && "text-muted-foreground"
          )}
        >
          {selectedValue
            ? languages.find((lang) => lang.value === selectedValue)?.label
            : "Select Language"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={() => {
                    onChange(language.value);
                    setOpen(false);
                  }}
                >
                  {language.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValue === language.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ToolBar() {
  const [value3, setValue3] = useState("");
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.chatId); 

  const handleLanguageChange = (newValue) => {
    console.log("Language selected:", newValue);
    setValue3(newValue); 
    if (chatId) {
      dispatch(updateLanguageThunk({ chatId, language: newValue,toast }));

    }
  };

  return (
    <div className="w-full h-auto bg-neutral-900 text-black p-6 space-y-6">
      <h2 className="text-xl font-bold text-white">ToolBar Settings</h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-white">Select Language</p>
          <Combobox selectedValue={value3} onChange={handleLanguageChange} />
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
