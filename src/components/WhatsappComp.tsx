import React from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

interface WhatsappCompProps {
  whatsapp: string;
  phone : string
}

const WhatsappComp: React.FC<WhatsappCompProps> = ({ whatsapp , phone}) => {
  return (
    <div className="fixed bottom-10 left-0 w-full px-6 md:px-12 lg:px-16 z-[99]">
      <div className="flex flex-col gap-5 justify-between w-full">
<a href={`tel:${phone}`}>
  <div
    className="flex items-center justify-center
               bg-blue-600 hover:bg-blue-700
               text-white rounded-full
               md:w-[73px] md:h-[73px]
               w-[55px] h-[55px]
               shadow-lg cursor-pointer
               transition-all duration-300"
  >
    <FiPhone className="md:text-4xl text-3xl" />
  </div>
</a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/header-whatsapp.png"
            alt="whatsapp"
            width={80}
            height={80}
            className="rounded-full md:w-[75px] w-[55px] md:h-[80px] h-[55px] cursor-pointer"
          />
        </a>

      
      </div>
    </div>
  )
}

export default WhatsappComp
