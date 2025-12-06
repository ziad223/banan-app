'use client';

import React from 'react';
import Container from '../shared/formcomponents/Container';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaTiktok, FaWhatsapp, FaSnapchatGhost, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Link } from '../../../navigation';

interface FooterProps {
  settings: {
    facebook?: string;
    instagram?: string;
    snapchat?: string;
    whatsapp?: string;
    tiktok?: string;
    footer_logo? : string;
    footer_text? : string
  };
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const t = useTranslations('footer');

  // خريطة الـ icons حسب الـ key
  const socialIconsMap: Record<string, React.ElementType> = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    snapchat: FaSnapchatGhost,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
  };
const  footer_logo = settings?.footer_logo;
const  footer_text = settings?.footer_text;
  return (
    <div className="bg-[#486b65] lg:h-[436px] py-10">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between w-full">
          {/* About Section */}
          <div className="lg:w-1/3 w-full">
            <Image
              src={footer_logo}
              alt="footer-logo"
              width={144}
              height={129}
            />
            <p className="text-white mt-3 text-base leading-7">
             {footer_text}
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-white font-semibold text-lg">
              {t('quickLinks')}
            </h2>
            <div className="flex gap-16">
              <ul className="flex gap-5 flex-col text-white">
                <li><Link href="/about-us" className='hover:text-[#a97c52] transition duration-300'>{t('links1.aboutUs')}</Link></li>
                <li><Link href="/partners" className='hover:text-[#a97c52] transition duration-300'>{t('links1.partners')}</Link></li>
                <li><Link href="#/contact-us" className='hover:text-[#a97c52] transition duration-300'>{t('links1.contact')}</Link></li>
                <li><Link href="/our-services" className='hover:text-[#a97c52] transition duration-300'>{t('links1.services')}</Link></li>
              </ul>
              <ul className="flex gap-5 flex-col text-white">
                <li><Link href="/our-projects" className='hover:text-[#a97c52] transition duration-300'>{t('links2.projects')}</Link></li>
                <li><Link href="/our-team" className='hover:text-[#a97c52] transition duration-300'>{t('links2.our-team')}</Link></li>
                <li><Link href="#" className='hover:text-[#a97c52] transition duration-300'>{t('links2.numbers')}</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-white font-semibold text-lg">{t('followUs')}</h2>
            <div className="flex items-center gap-3 mt-5">
              {Object.entries(settings).map(([key, value]) => {
                if (!value || !socialIconsMap[key]) return null;
                const Icon = socialIconsMap[key];
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] bg-[#a97c52] flex items-center justify-center cursor-pointer"
                  >
                    <Icon className="text-white text-lg" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
